import openai
import gradio as gr
import os
from dotenv import load_dotenv

# Load API key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# System message (you can improve this later)
SYSTEM_PROMPT = """
You are a friendly assistant for a movie booking app. 
You greet the user, ask what they are looking for (e.g., browse movies, check showtimes, or book tickets),
and respond in a short and helpful way. Don't make up data, just respond based on the conversation.
"""

# Store conversation history
conversation_history = [{"role": "system", "content": SYSTEM_PROMPT}]

def chat(user_input):
    conversation_history.append({"role": "user", "content": user_input})
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # or gpt-4 if you have access
        messages=conversation_history
    )

    reply = response.choices[0].message.content
    conversation_history.append({"role": "assistant", "content": reply})
    
    return reply

iface = gr.Interface(
    fn=chat,
    inputs=gr.Textbox(lines=2, placeholder="Hi, I want to book a movie ticket..."),
    outputs="text",
    title="🎬 Movie Booking AI Assistant",
    description="Chat with this agent to explore and book movies."
)

if __name__ == "__main__":
    iface.launch()
