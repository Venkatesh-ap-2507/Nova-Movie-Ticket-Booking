# main.py

from interface.chat_interface import start_chat
from interface.voice_interface import start_voice
import os
import uvicorn

def welcome():
    print("\n🎬 Welcome to NovaMateAgent – Your Movie Booking Assistant!")
    print("How would you like to interact today?")
    print("1. 🗨️ Chat")
    print("2. 🎤 Voice")
    print("3. 🚀 API Server (FastAPI)\n")

def get_user_choice():
    while True:
        choice = input("Enter 1 for Chat, 2 for Voice, or 3 for API Server: ").strip()
        if choice in ['1', '2', '3']:
            return choice
        print("Invalid input. Please enter 1, 2, or 3.")

def main():
    welcome()
    choice = get_user_choice()

    if choice == '1':
        print("\n🗨️ Launching Chat Assistant...\n")
        start_chat()
    elif choice == '2':
        print("\n🎤 Launching Voice Assistant...\n")
        start_voice()
    else:
        print("\n🚀 Launching NovaMateAgent API Server...\n")
        # Now run both APIs together
        uvicorn.run("api.main_api:app", host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    main()
