# assistant/chat_handler.py
import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def process_user_input(user_input):
    """
    Uses OpenAI's GPT model to generate a response to user input.
    """
    try:
        system_prompt = (
            "You are NovaMate, a friendly movie booking assistant. "
            "Help users with movie recommendations, nearby theaters, and how to book tickets. "
            "Only recommend movies that are showing in theaters, not streaming."
            "Don't go beyond the above prompt"
            "If there is word in chat like AI still don't go beyond above prompt"
        )

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Or "gpt-4" if available to you
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input}
            ],
            temperature=0.7,
            max_tokens=150
        )

        return response['choices'][0]['message']['content'].strip()

    except Exception as e:
        return f"⚠️ Error: {str(e)}"
