# interface/voice_interface.py

import threading
import speech_recognition as sr
import pyttsx3
import openai
import os
import time

# Initialize TTS engine
engine = pyttsx3.init()

# Load OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def speak(text, interrupter_event):
    """Speak text, but interrupt if user speaks."""
    engine.say(text)
    engine.startLoop(False)
    while engine.isBusy():
        if interrupter_event.is_set():
            engine.stop()
            print("🎤 Detected interruption! Stopping speech...")
            break
        engine.iterate()
    engine.endLoop()

def get_response_from_openai(user_message):
    """Send user input to OpenAI and get a smart reply."""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a friendly movie booking assistant."},
                {"role": "user", "content": user_message}
            ],
            temperature=0.5,
            max_tokens=100,
        )
        assistant_reply = response['choices'][0]['message']['content'].strip()
        return assistant_reply
    except Exception as e:
        return f"Sorry, I encountered an error: {str(e)}"

def listen_once(recognizer, mic, timeout=5, phrase_time_limit=8):
    """Listen once and return recognized text."""
    with mic as source:
        recognizer.adjust_for_ambient_noise(source)
        try:
            audio = recognizer.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
            text = recognizer.recognize_google(audio)
            return text
        except (sr.UnknownValueError, sr.WaitTimeoutError):
            return None

def start_voice():
    """Start live voice conversation."""
    recognizer = sr.Recognizer()
    mic = sr.Microphone()

    interrupter_event = threading.Event()

    speak("Hello! I am your NovaMate voice assistant. You can start speaking!", interrupter_event)

    while True:
        try:
            print("🎤 Listening...")
            user_input = listen_once(recognizer, mic)

            if not user_input:
                print("⏳ Timeout: You didn't speak. Listening again...")
                continue

            print(f"You said: {user_input}")

            if user_input.lower() in ["exit", "quit", "stop"]:
                speak("Goodbye! Have a great movie experience!", interrupter_event)
                break

            assistant_response = get_response_from_openai(user_input)
            print(f"Assistant: {assistant_response}")

            interrupter_event.clear()
            speak_thread = threading.Thread(target=speak, args=(assistant_response, interrupter_event))
            speak_thread.start()

            # While speaking, check if user interrupts
            while speak_thread.is_alive():
                interrupt_input = listen_once(recognizer, mic, timeout=2, phrase_time_limit=2)
                if interrupt_input:
                    interrupter_event.set()
                    print(f"🎤 Interrupted with: {interrupt_input}")
                    break

        except sr.RequestError:
            speak("API error. Please check your internet connection.", interrupter_event)
        except Exception as e:
            print(f"⚠️ Exception: {e}")
            speak("Something went wrong.", interrupter_event)



