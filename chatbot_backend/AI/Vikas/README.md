# 🎬 NovaMate – Your Personal Movie Booking Assistant on NovaMovies Application

**NovaMateAgent** is a smart multi-agent assistant that helps users discover and book movies in theaters based on IMDB/TMDB ratings, personal preferences, and past booking behavior. It uses **RAG (Retrieval-Augmented Generation)** and a **multi-agent architecture** to offer a seamless booking experience.

---

## 🧠 Features

- 🎞️ **Smart Movie Recommender**  
  Suggests movies using IMDB & TMDB ratings, showtimes, and user preferences via RAG.

- 🔍 **Fuzzy Search Agent**  
  Helps search movies by genre, title, location, showtime, and more.

- 🧭 **Booking Navigator**  
  Interactively guides the user through booking steps — location → theater → showtime → seats.

- 🗃️ **User Context Memory**  
  Remembers your past bookings, likes/dislikes, and genre preferences.

---

## 🧩 Architecture

This project is built using a **modular, multi-agent system**:

| Agent                  | Responsibility |
|------------------------|----------------|
| `UserContextAgent`     | Stores/retrieves user history and preferences |
| `MovieRecommenderAgent`| Uses RAG + ratings + history to suggest movies |
| `SearchAgent`          | Refines search based on filters and fuzzy queries |
| `BookingNavigatorAgent`| Guides user through the booking process |

> ✅ View Architecture Diagram in `/docs/NovaMateAgent_Diagram.jpg`

---

## 📁 Project Structure

```
NovamateAgent/
├── agents/               # Core multi-agent logic
├── rag/                  # RAG modules: retriever, embedder, loader
├── data/                 # Ratings, movie info, user history
├── interface/            # CLI, chatbot, or web interface
├── utils/                # Config, logger, helper functions
├── tests/                # Unit tests for each agent
├── main.py               # Entry point
├── requirements.txt      # Dependencies
└── README.md             # Project info
```


---

## 📊 Technologies Used

- 🧠 **LLMs + RAG** (OpenAI / HuggingFace + FAISS/Chroma)
- 📡 **TMDB + IMDB APIs** for movie info
- 🗃️ **FAISS** for retrieval
- 🧪 **Python** with modular agent-based architecture
- ⚙️ Integration: Flask / FastAPI for NovaMovies UI

---

## 📌 Roadmap

- [x] Multi-agent flow
- [x] RAG-based recommender
- [x] Booking UI via CLI
- [x] Voice Assistant 
- [ ] Real-time theater integration (Coming Soon)


---

## 📜 License

64 SQUARE APPEX LLC © 2025 NovaMate AI Team
