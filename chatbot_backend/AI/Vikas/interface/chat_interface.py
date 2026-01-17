# interface/chat_interface.py

from interface.chat_handler import process_user_input

def start_chat():
    print("🗨️ NovaMateAgent Chat Assistant is ready. Type 'exit' to quit.\n")

    while True:
        user_input = input("You: ")
        if user_input.lower().strip() == "exit":
            print("Assistant: 👋 Goodbye!")
            break

        response = process_user_input(user_input)
        print(f"Assistant: {response}")
