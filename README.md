# Nova Movie Ticket Booking System

A comprehensive movie ticket booking platform with AI-powered chatbot assistance, admin management, and user-friendly interfaces.

## Overview

Nova is a full-stack movie ticket booking system that allows users to browse movies, book tickets, and interact with an AI chatbot for recommendations and queries. The system includes a web frontend for chatbot interaction, a mobile admin app for theater management, and robust backend APIs.

## Features

- **Movie Management**: Add, update, and manage movie catalogs with details like cast, genres, languages, and descriptions
- **Show Scheduling**: Create and manage movie shows with theater screens and seating arrangements
- **Ticket Booking**: User-friendly ticket booking with seat selection
- **AI Chatbot**: Intelligent chatbot powered by OpenAI and LangChain for movie recommendations and customer support
- **Admin Dashboard**: Mobile app for administrators to manage movies, screens, shows, and analytics
- **User Authentication**: Secure JWT-based authentication for users and admins
- **Multi-language Support**: Support for multiple languages in movie listings

## Tech Stack

### Backend (Server)
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **OpenAI API** for AI features
- **Redis** for caching
- **Multer** for file uploads

### Chatbot Backend
- **Django** with Daphne (ASGI)
- **LangChain** and OpenAI for AI processing
- **SQLite** database

### Frontend (Chatbot Interface)
- **React** with Vite
- **Tailwind CSS** for styling
- **Axios** for API calls

### Admin App
- **React Native** with Expo
- **React Navigation** for routing
- **AsyncStorage** for local storage

## Project Structure

```
Nova-Movie-Ticket-Booking/
├── Server/                 # Main backend API (Node.js)
├── chatbot_backend/        # AI chatbot backend (Django)
├── Frontend/              # Chatbot web interface (React)
├── nova_admin/            # Admin mobile app (React Native)
├── Client/                # Client applications (incomplete)
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB
- Redis (optional, for caching)
- Expo CLI (for mobile app)
- Git

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Nova-Movie-Ticket-Booking.git
cd Nova-Movie-Ticket-Booking
```

### 2. Backend Setup (Server)

```bash
cd Server
npm install
```

Create a `.env` file in the Server directory:

```env
NOVA_PORT=3004
MONGODB_URI=mongodb://localhost:27017/nova_movies
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
REDIS_URL=redis://localhost:6379
```

Start the server:

```bash
npm run dev
```

### 3. Chatbot Backend Setup

```bash
cd ../chatbot_backend
pip install -r requirements.txt
```

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
DJANGO_SECRET_KEY=your_django_secret
```

Run migrations and start:

```bash
python manage.py migrate
python manage.py runserver
```

### 4. Frontend Setup (Chatbot Interface)

```bash
cd ../Frontend
npm install
npm run dev
```

### 5. Admin App Setup

```bash
cd ../nova_admin
npm install
npm start
```

For mobile development:

```bash
npm run android  # For Android
npm run ios      # For iOS
```

## API Endpoints

### User Routes
- `GET /api/movies` - Get all movies
- `POST /api/auth/login` - User login
- `POST /api/tickets/book` - Book tickets
- `GET /api/shows` - Get movie shows

### Admin Routes
- `POST /api/adminCall/movies` - Add new movie
- `PUT /api/adminCall/movies/:id` - Update movie
- `POST /api/adminCall/shows` - Create show
- `GET /api/adminCall/analytics` - Get analytics

## Database Models

- **User**: User accounts and authentication
- **Admin**: Admin accounts
- **Movie**: Movie details (name, cast, genres, etc.)
- **Cast**: Movie cast members
- **Genre**: Movie genres
- **Language**: Supported languages
- **Screen**: Theater screens
- **Show**: Movie show timings
- **Seat**: Seat arrangements
- **Ticket**: Booked tickets
- **Price**: Pricing information

## Environment Variables

Create `.env` files in respective directories with the following variables:

### Server/.env
```
NOVA_PORT=3004
MONGODB_URI=mongodb://localhost:27017/nova_movies
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key
REDIS_URL=redis://localhost:6379
```

### chatbot_backend/.env
```
OPENAI_API_KEY=your_openai_api_key
DJANGO_SECRET_KEY=your_django_secret_key
```

## Development

### Running Tests
```bash
# Backend tests
cd Server
npm test

# Frontend tests
cd Frontend
npm run test
```

### Building for Production
```bash
# Frontend build
cd Frontend
npm run build

# Admin app build
cd nova_admin
expo build:android
expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please open an issue on GitHub.