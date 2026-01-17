from django.shortcuts import render
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain.tools import StructuredTool
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain.memory import ConversationEntityMemory
import requests
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from fuzzywuzzy import process
from datetime import datetime


load_dotenv()

url = os.getenv("API_CALL_URL")

last_movie_name = None




def get_movies():
    print("get_movies")
    response = requests.get(url + "get-movies-upcoming-ongoing").json()
    movies = response.get("data", [])

    formatted_movies = []

    for movie in movies:
        formatted_movies.append({
            "name": movie.get("name"),
            "photoUrls":movie.get("photoUrls"),
            "languages": [lang["name"] for lang in movie.get("languages", [])],
            "genres": [gid for gid in movie.get("genres", [])],
            "filmCertificate": movie.get("filmCertificate"),
            "releasedDate": movie.get("releasedDate"),
            "description": movie.get("description")
        })
    result = {
        "type": "movie_list_view",
        "result": formatted_movies
    }
    # print("resultresult", result)
    return result

#for upcomming movies that are not relesead yet 
def get_upcoming_movies():
    print("get_upcoming_movies")
    response = requests.get(url + "get-movies-upcoming-ongoing").json()
    movies = response.get("data", [])

    today = datetime.today().date()
    upcoming_movies = []

    for movie in movies:
        released_date_str = movie.get("releasedDate", "")
        try:
            released_date = datetime.strptime(released_date_str,  "%Y-%m-%dT%H:%M:%S.%fZ").date()
            if released_date > today:
                upcoming_movies.append({
                    "name": movie.get("name"),
                    "photoUrls": movie.get("photoUrls"),
                    "languages": [lang["name"] for lang in movie.get("languages", [])],
                    "genres": [gid for gid in movie.get("genres", [])],
                    "filmCertificate": movie.get("filmCertificate"),
                    "releasedDate": movie.get("releasedDate"),
                    "description": movie.get("description")
                })
        except Exception as e:
            print(f"Skipping movie due to error parsing date: {e}")

    return {
        "type": "movie_list_view",
        "result": upcoming_movies
    }



# for find the closet one if spelling mistake by user 
def find_closest_movie_name(user_input):
    try:
        all_movies = requests.get(url + "get-movies-upcoming-ongoing").json().get("data", [])
        movie_names = [m["name"] for m in all_movies]
        best_match, score = process.extractOne(user_input, movie_names)
        if score > 70:
            return best_match
    except:
        return None
    return None




def find_closest_movie_name(user_input):
    try:
        all_movies = requests.get(url + "get-movies-upcoming-ongoing").json().get("data", [])
        movie_names = [m["name"] for m in all_movies]
        best_match, score = process.extractOne(user_input, movie_names)
        if score > 70:
            return best_match
    except:
        return None
    return None

def get_cast_of_movie_safe(movie_name: str = None):
    global last_movie_name
    if not movie_name:
        movie_name = last_movie_name
    if movie_name:
        corrected_name = find_closest_movie_name(movie_name)
        if not corrected_name:
            return {"type": "cast_list_of_movie", "result": {"cast": [], "movie": movie_name, "error": "Movie not found"}}
        movie_name = corrected_name
        last_movie_name = movie_name
        print("get_cast_of_movie_safe", movie_name)
        try:
            response = requests.get(url + f"get-cast-by-moviename/{movie_name}")
            data = response.json()
            cast_list = data.get("data", [])

            formatted_cast = [
                {
                    "name": c.get("name", ""),
                    "job": c.get("job", ""),
                    "photo": c.get("photo", "")
                } for c in cast_list
            ]

            return {
                "type": "cast_list_of_movie",
                "result": {
                    "cast": formatted_cast,
                    "movie": movie_name
                }
            }
        except Exception as e:
            return {"error": f"Failed to fetch cast: {str(e)}"}

    return {"error": "Movie name missing"}



def show_avilable_seats_in_show(show_id: str):
    print("get_show_seats_by_show_id")
    return requests.get(url + f"get-show-seats-by-showid/{show_id}").json()

def get_all_shows():
    print("get_all_shows")
    print("url",url)
    a = requests.get(url + "get-all-shows").json()
    return a

system_template = """
You are a helpful assistant for a movie theater booking system. Users may refer to movies and shows by name or contextually (e.g., "this movie"). Always resolve context from conversation memory.

Tasks you can perform:
1. List Available Released Movies
2. List Upcoming Movies
3. List all available Shows for Movies
4. Showtimes
5. Seat Availability
6. Get Cast Info
7. Book Tickets
8. When user ask about book ticket for any movies. You should reply to first login to the System.


Instructions:
- If the user asks to "avialable movies", "give movies", "movies", or similar use get movies tool and display all movies
- If the user asks to "available todays shows" and similar to this then use get_all_shows tool with screen.
- If the user asks for "upcoming movies", then and only then use the upcoming movies tool.
- If the user asks about "Star", "Actor" and "cast" of the movies then only use get_cast_of_movie tool in another case avoid to use this tool. If cast is not found then return text response like "not found cast for movie_name movie".
- If the user asks about "available seat for movie with movies_name then only use show_avilable_seats_in_show.
- If user ask about the any movies that are not in database then should return the movie is not available like user ask "When the movie_name is releasing".
- Do not mix upcoming and released movies unless explicitly asked.
- Use tools only. Never guess answers.
- Use memory to resolve references like "this movie"
- Return valid JSON. No markdown, no extra explanation.
- If user ask about you should not return in JSON. 

Guidelines:
- Return strictly valid JSON, no markdown, no explanations.
- Do not format responses as lists, bullet points, or prose. Only use structured JSON.
- If no close match is found, return a message like "Movie not found" in the text format.

Example JSON response format:
{{
  "type": "movie_list_view",
  "result": [
    {{
      "name": "Inception",
      "photoUrls":["https://picsum.photos/600/800"],
      "languages": ["English", "Hindi"],
      "genres": ["Sci-Fi", "Thriller"],
      "filmCertificate": "U/A",
      "releasedDate": "2010-07-16",
      "description": "A skilled thief is offered a chance to have his criminal history erased..."
    }}
  ]
}}
"""

tools = [
    # StructuredTool.from_function(get_movies, name="get_movies", description="Get list of upcoming and ongoing movies. return output in valid JSON format without extra commentary or explanation." \
    # "output format: {type: movie_list_view, result: [{movie_name, languages, genres, filmCertificate, releasedDate, description}]}" ),

    StructuredTool.from_function(
    get_movies,
    name="get_movies",
    description=(
        "Get list of upcoming and ongoing movies. "
        "Return output in strict JSON format only — no extra commentary, no markdown, no explanation. "
        "Output format: {\"type\": \"movie_list_view\", \"result\": [{\"name\": string,\"photoUrls\":[string], \"languages\": [string], \"genres\": [string], \"filmCertificate\": string, \"releasedDate\": string, \"description\": string}]}"
    )
)
,

    StructuredTool.from_function(
    get_upcoming_movies,
    name="get_upcoming_movies",
    description=(
        "Get list of upcoming movies only (not yet released). "
        "Return output in strict JSON format only — no markdown or extra text. "
        "Output format: {\"type\": \"movie_list_view\", \"result\": [{\"name\": string,\"photoUrls\":[string], \"languages\": [string], \"genres\": [string], \"filmCertificate\": string, \"releasedDate\": string, \"description\": string}]}"
    )
),


    StructuredTool.from_function(show_avilable_seats_in_show, name="show_avilable_seats_in_show", description="Get available seats in a show by show ID"),
  
    StructuredTool.from_function(
        get_all_shows, name="get_all_shows", 
        description="get all available shows which are released and avialable in theater"
                    "Return output in strict JSON format only -no markdown or extra."
                    "Output format: {\"type\": \"shows_list_view\",\"result\": [{\"name\": string, \"ReleasedDate\": string, \"StartTime\":string, \"EndTime\":string, \"Available_Seat\":string, \"Screen_No\":string }]}" 
    ""),

    StructuredTool.from_function(
    get_cast_of_movie_safe,
    name="get_cast_of_movie",
    description=(
        "Get cast of a movie by movie name.If cast not found then return text messege accordingly and if found Returns structured JSON:\n"
        "{type: \"cast_list_of_movie\", result: {cast: [{name: str, job: str, photo: str}], movie: str}}"
        
    ),
    )
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
        print("chat_history",result["output"])
        # return "\n\n".join([f"User: {m}\nAI: {r}" for m, r in chat_history])
        return result["output"]
    except Exception as e:
        return f"Error: {str(e)}"


import json

@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            message = data.get('message')
            print(message)
        except Exception:
            return HttpResponseBadRequest("Invalid JSON data.")

        if not message:
            return HttpResponseBadRequest("No message provided.")

        response = chat_with_agent(message)
        print(response)
        return JsonResponse({"response": response})

    return HttpResponseBadRequest("Invalid request method.")