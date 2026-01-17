import openai
import gradio as gr
import os
from dotenv import load_dotenv
import ast
import requests

url = 'http://localhost:3004/api/adminCall/'

# Load API key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


functions = [
    {
        "name": "get_movies",
        "description": "Get a list of available movies",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "get_showtimes",
        "description": "Get showtimes for a specific movie",
        "parameters": {
            "type": "object",
            "properties": {
                "movie_name": {
                    "type": "string",
                    "description": "Name of the movie to find showtimes for"
                }
            },
            "required": ["movie_name"]
        }
    },
    {
        "name": "book_ticket",
        "description": "Book a ticket for a specific movie and showtime",
        "parameters": {
            "type": "object",
            "properties": {
                "movie_name": {"type": "string"},
                "showtime": {"type": "string"},
                "seats": {"type": "integer"}
            },
            "required": ["movie_name", "showtime", "seats"]
        }
    },
    {
        "name": "get_cast_by_id",
        "description": "Get cast (actor/actress/director) information by ID",
        "parameters": {
            "type": "object",
            "properties": {
                "cast_id": {"type": "string"}
            },
            "required": ["cast_id"]
        }
    },
    {
        "name": "get_cast_ongoing_movies",
        "description": "Get all ongoing movies for a specific cast",
        "parameters": {
            "type": "object",
            "properties": {
                "cast_id": {"type": "string"}
            },
            "required": ["cast_id"]
        }
    },
    {
        "name": "get_cast_coming_movies",
        "description": "Get all upcoming movies for a specific cast",
        "parameters": {
            "type": "object",
            "properties": {
                "cast_id": {"type": "string"}
            },
            "required": ["cast_id"]
        }
    },
    {
        "name": "get_all_movies_upcoming_ongoing",
        "description": "Get all upcoming and currently playing movies",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "get_movie_by_id",
        "description": "Get movie information by ID",
        "parameters": {
            "type": "object",
            "properties": {
                "movie_id": {"type": "string"}
            },
            "required": ["movie_id"]
        }
    },
    {
        "name": "get_upcoming_movies",
        "description": "Get all upcoming movies",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "get_ongoing_movies",
        "description": "Get all currently playing movies",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "get_available_seats_by_movie",
        "description": "Get available seats for a movie by movie ID",
        "parameters": {
            "type": "object",
            "properties": {
                "movie_id": {"type": "string"}
            },
            "required": ["movie_id"]
        }
    },
    {
        "name": "get_shows_by_movie_id",
        "description": "Get list of shows for a movie",
        "parameters": {
            "type": "object",
            "properties": {
                "movie_id": {"type": "string"}
            },
            "required": ["movie_id"]
        }
    },
    {
        "name": "get_show_by_id",
        "description": "Get show information by show ID",
        "parameters": {
            "type": "object",
            "properties": {
                "show_id": {"type": "string"}
            },
            "required": ["show_id"]
        }
    },
    {
        "name": "get_all_shows",
        "description": "Get a list of all shows",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "get_show_seats_by_show_id",
        "description": "Get all seats for a show by show ID",
        "parameters": {
            "type": "object",
            "properties": {
                "show_id": {"type": "string"}
            },
            "required": ["show_id"]
        }
    },
    {
        "name": "get_show_available_seats_by_show_id",
        "description": "Get available seats for a show by show ID",
        "parameters": {
            "type": "object",
            "properties": {
                "show_id": {"type": "string"}
            },
            "required": ["show_id"]
        }
    },
    {
        "name": "get_user_all_tickets",
        "description": "Get all tickets booked by a user",
        "parameters": {
            "type": "object",
            "properties": {
                "user_id": {"type": "string"}
            },
            "required": ["user_id"]
        }
    },
    {
        "name": "book_ticket_advanced",
        "description": "Book a ticket using userId, showId, and seatIds",
        "parameters": {
            "type": "object",
            "properties": {
                "user_id": {"type": "string"},
                "show_id": {"type": "string"},
                "seat_ids": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["user_id", "show_id", "seat_ids"]
        }
    }
]

import requests

url = "http://localhost:3004/api/adminCall/"

def call_function(name, arguments):
    if name == "get_movies":
        return requests.get(url + "get-movies-upcoming-ongoing").json()

    elif name == "get_cast_by_id":
        return requests.get(url + f"get-cast/{arguments['cast_id']}").json()

    elif name == "get_cast_ongoing_movies":
        return requests.get(url + f"get-cast-ongoing-movies/{arguments['cast_id']}").json()

    elif name == "get_cast_coming_movies":
        return requests.get(url + f"get-cast-comming-movies/{arguments['cast_id']}").json()

    elif name == "get_all_movies_upcoming_ongoing":
        return requests.get(url + "get-movies-upcoming-ongoing").json()

    elif name == "get_movie_by_id":
        return requests.get(url + f"get-movie/{arguments['movie_id']}").json()

    elif name == "get_upcoming_movies":
        return requests.get(url + "get-upcomming-movies").json()

    elif name == "get_ongoing_movies":
        return requests.get(url + "get-ongoing-movies").json()

    elif name == "get_available_seats_by_movie":
        return requests.get(url + f"get-available-seats-by-movieid/{arguments['movie_id']}").json()

    elif name == "get_shows_by_movie_id":
        return requests.get(url + f"get-list-of-shows-by-movieid/{arguments['movie_id']}").json()

    elif name == "get_show_by_id":
        return requests.get(url + f"get-show-by-showid/{arguments['show_id']}").json()

    elif name == "get_all_shows":
        return requests.get(url + "get-all-shows").json()

    elif name == "get_show_seats_by_show_id":
        return requests.get(url + f"get-show-seats-by-showid/{arguments['show_id']}").json()

    elif name == "get_show_available_seats_by_show_id":
        return requests.get(url + f"get-show-available-seats-by-showid/{arguments['show_id']}").json()

    elif name == "get_user_all_tickets":
        return requests.get(url + f"get-user-all-ticket/{arguments['user_id']}").json()

    elif name == "book_ticket_advanced":
        response = requests.post(
            url + "book-ticket",
            json={
                "userId": arguments["user_id"],
                "showId": arguments["show_id"],
                "seatIds": arguments["seat_ids"]
            }
        )
        return response.json()

    else:
        return {"error": "Unknown function"}


# Chat logic with function calling
conversation_history = [{"role": "system", "content": "You are a helpful assistant for a movie booking app."}]

def chat_with_function_call(user_input):
    conversation_history.append({"role": "user", "content": user_input})

    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-0125",
    messages=conversation_history,
    functions=functions,
    function_call="auto"
    )


    reply = response.choices[0].message

    if reply.get("function_call"):
        func_name = reply.function_call.name
        args = ast.literal_eval(reply.function_call.arguments)
        result = call_function(func_name, args)
        result_str = f"[{func_name}] {result}"

        conversation_history.append({
            "role": "function",
            "name": func_name,
            "content": str(result)
        })
        return result_str
    else:
        conversation_history.append({"role": "assistant", "content": reply.content})
        return reply.content

# Gradio UI
iface = gr.Interface(
    fn=chat_with_function_call,
    inputs=gr.Textbox(lines=2, placeholder="Ask me to book tickets or view showtimes..."),
    outputs="text",
    title="🎬 Smart Movie Booking Assistant",
    description="This assistant understands your intent (movies, shows, tickets) and interacts using AI + tools."
)

if __name__ == "__main__":
    iface.launch()
