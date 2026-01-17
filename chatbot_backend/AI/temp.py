# import os
# import gradio as gr
# from dotenv import load_dotenv
# from langchain_openai import ChatOpenAI
# from langchain.agents import create_openai_functions_agent, AgentExecutor
# from langchain.tools import StructuredTool
# from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
# from langchain.memory import ConversationBufferMemory
# from contextlib import contextmanager
# import requests

# load_dotenv()

# url = "http://localhost:3004/api/adminCall/"


# def get_movies():
#     print("get_movies")
#     return requests.get(url + "get-movies-upcoming-ongoing").json()

# def book_ticket(movie_id: str, show_id: str, mobile_number: str, seat_ids: list):
#     print("book_ticket")
#     response = requests.post(
#         url + "book-ticket",
#         json={
#             "movie_id": movie_id,
#             "show_id": show_id,
#             "mobile_number": mobile_number,
#             "seat_ids": seat_ids
#         }
#     )
#     return response.json()


# def show_avilable_seats_in_show(show_id: str):
#     print("get_show_seats_by_show_id")
#     return requests.get(url + f"get-show-seats-by-showid/{show_id}").json()

# def get_cast_by_id(cast_id: str):
#     print("get_cast_by_id")
#     return requests.get(url + f"get-cast/{cast_id}").json()

# def get_cast_ongoing_movies(cast_id: str):
#     print("get_cast_ongoing_movies")
#     return requests.get(url + f"get-cast-ongoing-movies/{cast_id}").json()

# def get_cast_coming_movies(cast_id: str):
#     print("get_cast_coming_movies")
#     return requests.get(url + f"get-cast-comming-movies/{cast_id}").json()

# def get_movie_by_id(movie_id: str):
#     print("get_movie_by_id")
#     return requests.get(url + f"get-movie/{movie_id}").json()

# def get_upcoming_movies():
#     print("get_upcoming_movies")
#     return requests.get(url + "get-upcomming-movies").json()

# def get_ongoing_movies():
#     print("get_ongoing_movies")
#     return requests.get(url + "get-ongoing-movies").json()

# def get_available_seats_by_movie(movie_id: str):
#     print("get_available_seats_by_movie")
#     return requests.get(url + f"get-available-seats-by-movieid/{movie_id}").json()

# def get_shows_by_movie_id(movie_id: str):
#     print("get_shows_by_movie_id")
#     return requests.get(url + f"get-list-of-shows-by-movieid/{movie_id}").json()

# def get_show_by_id(show_id: str):
#     print("get_show_by_id")
#     return requests.get(url + f"get-show-by-showid/{show_id}").json()

# def get_cast_of_movie(movie_id: str):
#     print("get_cast_of_movie")
#     print(movie_id)
#     return requests.get(url + f"get-cast-by-moviename/{movie_id}").json()

# def get_all_shows():
#     print("get_all_shows")
#     return requests.get(url + "get-all-shows").json()




# def get_show_seats_by_show_id(show_id: str):
#     print("get_show_seats_by_show_id")
#     return requests.get(url + f"get-show-seats-by-showid/{show_id}").json()

# def get_show_available_seats_by_show_id(show_id: str):
#     print("get_show_available_seats_by_show_id")
#     return requests.get(url + f"get-show-available-seats-by-showid/{show_id}").json()

# def get_user_all_tickets(user_id: str):
#     print("get_user_all_tickets")
#     return requests.get(url + f"get-user-all-ticket/{user_id}").json()

# def book_ticket_advanced(user_id: str, show_id: str, seat_ids: list):
#     print("book_ticket_advanced")
#     response = requests.post(
#         url + "book-ticket",
#         json={
#             "userId": user_id,
#             "showId": show_id,
#             "seatIds": seat_ids
#         }
#     )
#     return response.json()
# system_template = """
# You are a helpful assistant for a movie theater booking system, and the user is a movie enthusiast. As a movie enthusiast, he will ask you questions about movies(upcoming, ongoing), shows(shows means the movie is playing on the theater on diffent screens), and tickets. 
# As a helpful assistant, you can perform the following tasks using the provided tools:

# 1. **List Available Movies**
# 2. **List Shows for Movies**
# 3. **Showtimes for Movies**
# 4. **Showtimes for shows**
# 5. **Check Seat Availability**
# 6. **Get Cast Information**
# 7. **Ticket Booking**
# 8. **Retrieve User Tickets**

# You MUST:
# - **Always call a tool** to answer user queries, even if the answer seems obvious.
# - **NEVER make up or guess answers**. Only respond based on the tool output or explicitly say: "I'm sorry, I couldn't find an answer to that."
# - **Engage in two-way conversation**: Ask the user for clarification or confirmation if information is missing.
# - **Check the 'releasedDate'** field when identifying upcoming movies. If `releasedDate > current date`, it is upcoming.
# - **Only consider movies "available" if they have active shows** in the `shows` collection.

# Guidelines:
# - Be user-friendly. Use clear, natural language in responses.
# - If data isn't available, explain politely and request more information.
# - Confirm before proceeding with bookings.
# - NEVER rely on prior knowledge or assumptions.

# Examples:
# - If the user asks "What are the available movies?", call the tool to check for movies with current shows.
# - If the user asks "Book a seat for Movie A", ask for show date and seat first, then use tools to complete the task.

# ALWAYS call the relevant tool. Do NOT skip tool calls under any condition.
# """

# tools = [
#     StructuredTool.from_function(get_movies, name="get_movies", description="Get list of upcoming and ongoing movies, (movies not shows)"),
#     StructuredTool.from_function(show_avilable_seats_in_show, name="show_avilable_seats_in_show", description="Get list of available seats in a show using show id"),
#     # StructuredTool.from_function(book_ticket, name="book_ticket", description="Book the ticket for a specific movie and showtime, its requires movie name and showtime, mobile number and seats number"),
#     StructuredTool.from_function(get_all_shows, name="get_all_shows", description="Get all shows with available number of seats with prices, its contains the show time of shows, and the movie name"),
#     StructuredTool.from_function(get_all_shows, name="get_all_shows_", description="show time of all shows, show name and movie name, show all shows"),
#     StructuredTool.from_function(get_cast_of_movie, name="get_cast_of_movie", description="Get of cast of a movie by movie name"),
# ]


# # LLM
# llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# # Create prompt (must include input + agent_scratchpad)
# prompt = ChatPromptTemplate.from_messages([
#     SystemMessagePromptTemplate.from_template(system_template),
#     HumanMessagePromptTemplate.from_template("{input}"),
#     SystemMessagePromptTemplate.from_template("{agent_scratchpad}")
# ])

# # Memory
# memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# # Agent
# agent = create_openai_functions_agent(llm=llm, tools=tools, prompt=prompt)

# agent_executor = AgentExecutor.from_agent_and_tools(
#     agent=agent,
#     tools=tools,
#     memory=memory,
#     verbose=True
# )

# # Gradio Chat UI
# chat_history = []

# def chat_with_agent(message):
#     global chat_history
#     try:
#         result = agent_executor.invoke({"input": message})
#         chat_history.append((message, result["output"]))
#         return "\n\n".join([f"User: {m}\nAI: {r}" for m, r in chat_history])
#     except Exception as e:
#         return f"Error: {str(e)}"

# gr.Interface(fn=chat_with_agent, inputs="text", outputs="text", title="LangChain Agent with Memory").launch()





import os
import gradio as gr
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain.tools import StructuredTool
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain.memory import ConversationEntityMemory
import requests

load_dotenv()

url = "http://localhost:3004/api/adminCall/"

# Global entity tracker
last_movie_name = None

def get_movies():
    print("get_movies")
    return requests.get(url + "get-movies-upcoming-ongoing").json()

def get_cast_of_movie_safe(movie_name: str = None):
    global last_movie_name
    if not movie_name:
        movie_name = last_movie_name
    if movie_name:
        last_movie_name = movie_name
        print("get_cast_of_movie_safe", movie_name)
        return requests.get(url + f"get-cast-by-moviename/{movie_name}").json()
    return {"error": "Movie name missing"}

def show_avilable_seats_in_show(show_id: str):
    print("get_show_seats_by_show_id")
    return requests.get(url + f"get-show-seats-by-showid/{show_id}").json()

def get_all_shows():
    print("get_all_shows")
    return requests.get(url + "get-all-shows").json()

system_template = """
You are a helpful assistant for a movie theater booking system. Users may refer to entities (movies, shows) by name or contextually (e.g., "this movie"). Always resolve context from conversation memory if an identifier is not explicitly provided.

Tasks you can perform:
1. List Available Movies
2. List Shows for Movies
3. Showtimes for Movies
4. Check Seat Availability
5. Get Cast Information
6. Ticket Booking

Guidelines:
- Always call tools. Never guess answers.
- Use memory to understand context like "this movie"
- Be clear and conversational
"""

tools = [
    StructuredTool.from_function(get_movies, name="get_movies", description="Get list of upcoming and ongoing movies"),
    StructuredTool.from_function(show_avilable_seats_in_show, name="show_avilable_seats_in_show", description="Get available seats in a show by show ID"),
    StructuredTool.from_function(get_all_shows, name="get_all_shows", description="Get all shows and availability"),
    StructuredTool.from_function(get_cast_of_movie_safe, name="get_cast_of_movie", description="Get cast of a movie by movie name (resolves 'this movie' from memory)")
]

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template(system_template),
    HumanMessagePromptTemplate.from_template("{input}"),
    SystemMessagePromptTemplate.from_template("{agent_scratchpad}")
])

memory = ConversationEntityMemory(llm=llm, return_messages=True)

agent = create_openai_functions_agent(llm=llm, tools=tools, prompt=prompt)

agent_executor = AgentExecutor.from_agent_and_tools(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True
)

chat_history = []

def chat_with_agent(message):
    global chat_history
    try:
        result = agent_executor.invoke({"input": message})
        chat_history.append((message, result["output"]))
        return "\n\n".join([f"User: {m}\nAI: {r}" for m, r in chat_history])
    except Exception as e:
        return f"Error: {str(e)}"

gr.Interface(fn=chat_with_agent, inputs="text", outputs="text", title="LangChain AI Agent with Memory & Context Resolution").launch()
