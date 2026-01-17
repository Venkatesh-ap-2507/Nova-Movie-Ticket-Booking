import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import { IoMdSend } from "react-icons/io";
import { FaRobot, FaUser, FaCalendarAlt, FaClock, FaLanguage } from "react-icons/fa";
import { MdLocalMovies, MdOndemandVideo, MdHighQuality, MdDescription } from "react-icons/md";
import { FaCouch, FaFilm, FaRegClock, FaRegBuilding } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [theme, setTheme] = useState('dark');
  
  // const url = import.meta.env.CHATBOT_URL + 'chatapp/send_message/';
  const url = import.meta.env.VITE_CHATBOT_URL + 'chatapp/send_message/';
  // const url = 'http://127.0.0.1:8000/chatapp/send_message/';
  console.log(url);

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        { 
          type: 'bot', 
          text: 'Welcome to Nova Movie Agent! 🎬 I can help you find information about movies, cast details, and more. Try asking about movies or search for upcoming releases!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
    
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      type: 'user', 
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setTypingIndicator(true);
    
    // Scroll to bottom
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    
    // Use axios instead of fetch for API calls
    
    axios
      .post( url, { message: input })
      .then(response => {
        setTypingIndicator(false);
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: response.data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: "❌ Error: Could not get a response from the server.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      })
      .finally(() => {
        setIsLoading(false);
        setTypingIndicator(false);
      });

    setInput("");
  };

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'cinema' : 'dark');
  };

  const getThemeClasses = () => {
    switch(theme) {
      case 'light':
        return {
          container: 'bg-white',
          header: 'bg-white text-gray-800 border-b border-gray-200',
          body: 'bg-gray-50',
          input: 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400',
          userBubble: 'bg-blue-500 text-white',
          botBubble: 'bg-white text-gray-800 border border-gray-200'
        };
      case 'cinema':
        return {
          container: 'bg-black',
          header: 'bg-red-900 text-white border-b border-red-800',
          body: 'bg-gradient-to-br from-gray-900 to-red-900',
          input: 'bg-gray-800 text-white border-red-800 focus:ring-red-500',
          userBubble: 'bg-red-700 text-white',
          botBubble: 'bg-gray-800 text-white border border-red-800'
        };
      default: // dark
        return {
          container: 'bg-gray-900',
          header: 'bg-gradient-to-r from-purple-900 to-blue-900 text-white',
          body: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
          input: 'bg-gray-800 text-white border-gray-700 focus:ring-purple-500',
          userBubble: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
          botBubble: 'bg-gray-800 text-white border border-gray-700'
        };
    }
  };

  const themeClasses = getThemeClasses();
  
  const clearChat = () => {
    setMessages([{ 
      type: 'bot', 
      text: 'Chat history has been cleared. How can I help you with movies today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const suggestedQueries = [
    "Show me upcoming movies",
    "What are the available showtimes?",
    "Cast information for Avengers",
    "Show popular movies"
  ];

  const handleSuggestedQuery = (query) => {
    setInput(query);
    // Optional: auto-send the suggested query
    // setTimeout(() => handleSend(), 100);
  };

  return (
    <div className={`h-screen w-full flex justify-center items-center ${theme === 'dark' ? 'bg-gray-950' : theme === 'light' ? 'bg-gray-100' : 'bg-black'} px-2`}>
      <div className={`w-full max-w-3xl h-[90vh] ${themeClasses.container} rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Header */}
        <div className={`${themeClasses.header} py-4 px-6 sticky top-0 z-10 shadow flex justify-between items-center`}>
          <div className="flex items-center gap-2">
            <MdLocalMovies className={`text-2xl ${theme === 'cinema' ? 'text-red-500' : 'text-purple-500'}`} />
            <span className="font-bold text-xl">Nova Movie Agent</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={clearChat}
              className={`text-sm px-3 py-1 rounded-md ${theme === 'cinema' ? 'hover:bg-red-800' : 'hover:bg-gray-700'} transition-all`}
              title="Clear chat"
            >
              Clear
            </button>
            <button 
              onClick={toggleTheme}
              className={`text-sm px-3 py-1 rounded-md ${theme === 'cinema' ? 'hover:bg-red-800' : 'hover:bg-gray-700'} transition-all`}
              title="Change theme"
            >
              {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🎬'}
            </button>
          </div>
        </div>

        {/* Scrollable messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${themeClasses.body}`}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs ${theme === 'cinema' ? 'text-red-400' : msg.type === 'user' ? 'text-blue-400' : 'text-purple-400'}`}>
                  {msg.timestamp}
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${theme === 'cinema' ? 'text-red-400' : msg.type === 'user' ? 'text-blue-400' : 'text-purple-400'}`}>
                  {msg.type === 'user' ? (
                    <>You <FaUser className="text-xs" /></>
                  ) : (
                    <>Nova <FaRobot className="text-xs" /></>
                  )}
                </span>
              </div>
              <div
                className={`px-4 py-3 rounded-2xl max-w-[90%] shadow-md text-sm whitespace-pre-line ${
                  msg.type === 'user'
                    ? themeClasses.userBubble
                    : themeClasses.botBubble
                } transform transition-all duration-300 hover:scale-[1.01]`}
              >
                {msg.type === 'user' ? msg.text : <ChatBotResponse msg={msg} theme={theme} />}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {typingIndicator && (
            <div className="flex flex-col items-start animate-fadeIn">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs ${theme === 'cinema' ? 'text-red-400' : 'text-purple-400'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${theme === 'cinema' ? 'text-red-400' : 'text-purple-400'}`}>
                  Nova <FaRobot className="text-xs" />
                </span>
              </div>
              <div className={`px-4 py-3 rounded-2xl shadow-md ${themeClasses.botBubble}`}>
                <div className="flex space-x-2">
                  <div className={`w-2 h-2 rounded-full ${theme === 'cinema' ? 'bg-red-500' : 'bg-purple-500'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                  <div className={`w-2 h-2 rounded-full ${theme === 'cinema' ? 'bg-red-500' : 'bg-purple-500'} animate-bounce`} style={{ animationDelay: '200ms' }}></div>
                  <div className={`w-2 h-2 rounded-full ${theme === 'cinema' ? 'bg-red-500' : 'bg-purple-500'} animate-bounce`} style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        {messages.length < 3 && (
          <div className={`px-4 py-3 ${themeClasses.container}`}>
            <p className={`text-xs mb-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Suggested queries:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuery(query)}
                  className={`text-xs px-3 py-2 rounded-full ${
                    theme === 'cinema' 
                      ? 'bg-red-900 text-white hover:bg-red-800' 
                      : theme === 'light'
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  } transition-colors`}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className={`p-4 border-t ${theme === 'cinema' ? 'border-red-900' : theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${themeClasses.container} flex items-center gap-3 sticky bottom-0 z-10 shadow`}>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about any movie..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              className={`w-full border ${theme === 'cinema' ? 'border-red-900' : theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-full py-3 pl-4 pr-12 shadow-sm focus:outline-none focus:ring-2 ${themeClasses.input} transition-all duration-300`}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-lg h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                input.trim() 
                  ? theme === 'cinema'
                    ? 'text-white bg-red-700 hover:bg-red-600'
                    : 'text-white bg-blue-600 hover:bg-blue-700' 
                  : 'text-gray-400 bg-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <IoMdSend className="text-sm" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

const ChatBotResponse = ({ msg, theme }) => {
  let content;

  try {
    // First try to parse as JSON
    const parsed = JSON.parse(msg.text);

    if (parsed.type === 'cast_list_of_movie') {
      content = (
        <div className="space-y-3">
          <div className="font-bold flex items-center gap-2 text-lg">
            🎬 <span>Cast for {parsed.result.movie}</span>
          </div>
          <CastList parsed={parsed} theme={theme} />
        </div>
      );
    } else if (parsed.type === 'movie_list_view') {
      content = (
        <div className="space-y-3">
          <div className="font-bold flex items-center gap-2 text-lg">
            🎬 <span>Movie List</span>
          </div>
          <MovieList parsed={parsed} theme={theme} />
        </div>
      );
    } else if (parsed.type === 'movie_details') {
      content = (
        <div className="space-y-3">
          <div className="font-bold flex items-center gap-2 text-lg">
            🎬 <span>Movie Details</span>
          </div>
          <MovieDetails movie={parsed.result} theme={theme} />
        </div>
      );
    } else if (parsed.type === 'upcoming_movies') {
      content = (
        <div className="space-y-3">
          <div className="font-bold flex items-center gap-2 text-lg">
            🎬 <span>Upcoming Movies</span>
          </div>
          <UpcomingMovies movies={parsed.result} theme={theme} />
        </div>
      );
    } else if (parsed.type === 'showtimes') {
      content = (
        <div className="space-y-3">
          <div className="font-bold flex items-center gap-2 text-lg">
            🎭 <span>Showtimes</span>
          </div>
          <ShowTimes showtimes={parsed.result} theme={theme} />
        </div>
      );
    } else if (parsed.type === 'shows_list_view') {
      // Handle the shows_list_view type
      content = (
        <div className="space-y-3">
          <div className="font-bold flex items-center gap-2 text-lg">
            🎭 <span>Available Shows</span>
          </div>
          <ShowTimes showtimes={parsed.result} theme={theme} />
        </div>
      );
    } else {
      content = msg.text; // fallback for other types
    }
  } catch (err) {
    // If not valid JSON, just display the text content
    content = msg.text;
  }
  
  return <div className="chat-bot-response">{content}</div>;
};

const formatReleaseDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatRuntime = (time) => {
  if (!time) return 'N/A';
  const { hours, minutes } = time;
  return `${hours}h ${minutes}m`;
};

const MovieDetails = ({ movie, theme }) => {
  const getCardClasses = () => {
    if (theme === 'cinema') return 'bg-black border border-red-900';
    if (theme === 'light') return 'bg-white border border-gray-200';
    return 'bg-gray-900 border border-gray-700';
  };

  const getTextClasses = () => {
    if (theme === 'light') return 'text-gray-800';
    return 'text-white';
  };

  const getLabelClasses = () => {
    if (theme === 'cinema') return 'text-red-400';
    if (theme === 'light') return 'text-gray-500';
    return 'text-gray-400';
  };

  return (
    <div className={`rounded-lg ${getCardClasses()} p-4 shadow-lg`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {movie.photoUrls && movie.photoUrls.length > 0 && (
          <div className="w-full sm:w-1/3">
            <img 
              src={movie.photoUrls[0]} 
              alt={movie.name}
              className="w-full h-auto rounded-lg shadow-md object-cover aspect-2/3"
            />
          </div>
        )}
        <div className="w-full sm:w-2/3 space-y-3">
          <h3 className={`text-xl font-bold ${getTextClasses()}`}>{movie.name}</h3>
          
          {/* Movie details in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className={getLabelClasses()} />
              <span className={`text-sm ${getLabelClasses()}`}>Released:</span>
              <span className={`text-sm ${getTextClasses()}`}>{formatReleaseDate(movie.releasedDate)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaClock className={getLabelClasses()} />
              <span className={`text-sm ${getLabelClasses()}`}>Runtime:</span>
              <span className={`text-sm ${getTextClasses()}`}>{formatRuntime(movie.time)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MdHighQuality className={getLabelClasses()} />
              <span className={`text-sm ${getLabelClasses()}`}>Certificate:</span>
              <span className={`text-sm ${getTextClasses()} ${
                theme === 'cinema' ? 'bg-red-900' : 'bg-blue-900'
              } px-2 py-0.5 rounded`}>{movie.filmCertificate || 'N/A'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaLanguage className={getLabelClasses()} />
              <span className={`text-sm ${getLabelClasses()}`}>Languages:</span>
              <span className={`text-sm ${getTextClasses()}`}>
                {movie.languages && movie.languages.length > 0 ? 
                  movie.languages.map(lang => lang.name || 'Unknown').join(', ') : 'N/A'}
              </span>
            </div>
          </div>
          
          {movie.description && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-1">
                <MdDescription className={getLabelClasses()} />
                <span className={`text-sm ${getLabelClasses()}`}>Description:</span>
              </div>
              <p className={`text-sm ${getTextClasses()} line-clamp-3`}>{movie.description || 'No description available.'}</p>
            </div>
          )}
          
          {movie.casts && movie.casts.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm ${getLabelClasses()}`}>Cast:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.casts.map((cast, index) => (
                  <span 
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${
                      theme === 'cinema' 
                        ? 'bg-red-900 text-white' 
                        : theme === 'light'
                          ? 'bg-gray-200 text-gray-800'
                          : 'bg-gray-700 text-white'
                    }`}
                  >
                    {cast}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UpcomingMovies = ({ movies, theme }) => {
  const formatDuration = (time) => {
    if (!time) return 'N/A';
    return `${time.hours}h ${time.minutes}m`;
  };
  
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {movies.map((movie, index) => (
        <article 
          key={movie._id || index}
          className={`relative group rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-3xl ${
            theme === 'cinema' 
              ? 'bg-gray-900 border border-red-800 hover:border-red-500' 
              : theme === 'light'
                ? 'bg-white border border-gray-100 hover:border-blue-200'
                : 'bg-gray-800 border border-gray-700 hover:border-blue-400'
          }`}
        >
          {/* Image with gradient overlay */}
          <div className="relative aspect-[2/3] overflow-hidden">
            {movie.photoUrls?.[0] && (
              <img
                src={movie.photoUrls[0]}
                alt={movie.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Top-right badge */}
            {movie.filmCertificate && (
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold ${
                theme === 'cinema' 
                  ? 'bg-red-600 text-white'
                  : theme === 'light'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-700 text-gray-100'
              }`}>
                {movie.filmCertificate}
              </div>
            )}
          </div>

          {/* Movie Details */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            {/* Title and Date */}
            <div className="space-y-1">
              <h3 className={`text-xl font-bold truncate ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {movie.name}
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                {formatDate(movie.releasedDate)}
              </p>
            </div>

            {/* Metadata Row */}
            {movie.time && (
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  <span className="text-sm">⏳ {formatDuration(movie.time)}</span>
                </div>
              </div>
            )}

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      theme === 'cinema' 
                        ? 'bg-red-900/30 text-red-300'
                        : theme === 'light'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-blue-900/30 text-blue-300'
                    }`}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Cast */}
            {movie.casts && movie.casts.length > 0 && (
              <div className={`border-t pt-3 ${
                theme === 'light' ? 'border-gray-100' : 'border-gray-700'
              }`}>
                <p className={`text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  Starring:
                </p>
                <div className="flex flex-wrap gap-2">
                  {movie.casts.slice(0, 3).map((cast, index) => (
                    <span 
                      key={index}
                      className={`px-2.5 py-0.5 rounded-full text-xs ${
                        theme === 'cinema' 
                          ? 'bg-red-800/20 text-red-300'
                          : theme === 'light'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-blue-800/20 text-blue-300'
                      }`}
                    >
                      {cast}
                    </span>
                  ))}
                  {movie.casts.length > 3 && (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                      theme === 'cinema' 
                        ? 'bg-red-800/20 text-red-300'
                        : theme === 'light'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-blue-800/20 text-blue-300'
                    }`}>
                      +{movie.casts.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 overflow-y-auto">
            <p className={`text-sm leading-relaxed ${
              theme === 'light' ? 'text-gray-200' : 'text-gray-100'
            }`}>
              {movie.description || 'No description available'}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

const MovieList = ({ parsed }) => {
  return (
    <div className="px-4 py-2">
      <h3 className="text-lg font-semibold mb-2">Featured Movies</h3>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {parsed.result.map((movie, i) => (
          <div
            key={movie._id || i}
            className="flex-shrink-0 w-48 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md">
              {movie.photoUrls?.[0] && (
                <img
                  src={movie.photoUrls[0]}
                  alt={movie.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwXlBfkNpl9-E51gAoh0JfwdykFB7--tTA7g&s';
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent p-2 flex flex-col justify-end">
                <h4 className="text-white font-medium text-sm truncate">
                  {movie.name}
                </h4>
                {movie.releasedDate && (
                  <p className="text-xs text-gray-200 mt-1">
                    {new Date(movie.releasedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CastList = ({ parsed }) => {
  return (
        <ul className="flex space-x-4 overflow-x-auto pb-2">
        {parsed.result.cast.map((actor, i) => (
          <li
            key={i}
          className="flex-shrink-0 w-28 h-34 flex flex-col items-center justify-between text-center border rounded-lg p-2"
          >
        {actor.photo && (
         <img
          src={actor.photo}
          alt={actor.name}
          className="w-16 h-16 rounded-full object-cover"
          />
            )}
          <div className="text-sm font-medium truncate w-full">{actor.name}</div>
        <div className="text-xs text-gray-600 truncate w-full">{actor.job}</div>
      </li>
      ))}
    </ul>
  );
}

const ShowTimes = ({ showtimes, theme }) => {
  // Transform the API response to match component expectations
  const processShowtimes = (shows) => {
    // Group showtimes by date and movie
    const grouped = {};
    
    shows.forEach(show => {
      const date = show.ReleasedDate;
      const movieName = show.name;
      
      if (!grouped[date]) {
        grouped[date] = {};
      }
      
      if (!grouped[date][movieName]) {
        grouped[date][movieName] = [];
      }
      
      grouped[date][movieName].push({
        startTime: show.StartTime,
        endTime: show.EndTime,
        movie: movieName,
        showDate: date,
        availableSeats: show.Available_Seat,
        screenNo: show.Screen_No
      });
    });
    
    return grouped;
  };

  // Process our data if it's in the API format
  let showData;
  try {
    if (Array.isArray(showtimes)) {
      showData = processShowtimes(showtimes);
    } else if (showtimes.result && Array.isArray(showtimes.result)) {
      showData = processShowtimes(showtimes.result);
    } else {
      // Fallback for the current format in the frontend code
      showData = {};
      
      showtimes.forEach(showtime => {
        if (!showData[showtime.showDate]) {
          showData[showtime.showDate] = {};
        }
        
        if (!showData[showtime.showDate][showtime.movie]) {
          showData[showtime.showDate][showtime.movie] = [];
        }
        
        showData[showtime.showDate][showtime.movie].push(showtime);
      });
    }
  } catch (error) {
    console.error("Error processing showtime data:", error);
    return <div>Error processing showtime data</div>;
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCardClasses = () => {
    if (theme === 'cinema') return 'bg-black border border-red-900';
    if (theme === 'light') return 'bg-white border border-gray-200';
    return 'bg-gray-900 border border-gray-700';
  };

  const getHeaderClasses = () => {
    if (theme === 'cinema') return 'bg-red-900 text-white';
    if (theme === 'light') return 'bg-gray-100 text-gray-800';
    return 'bg-gray-800 text-white';
  };

  const getTimeClasses = () => {
    if (theme === 'cinema') return 'bg-red-900 text-white hover:bg-red-800';
    if (theme === 'light') return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    return 'bg-blue-900 text-white hover:bg-blue-800';
  };

  return (
    <div className="space-y-6">
      {Object.keys(showData).sort().map(date => (
        <div key={date} className={`rounded-lg overflow-hidden shadow-lg ${getCardClasses()}`}>
          {/* Date Header */}
          <div className={`p-3 ${getHeaderClasses()} font-medium flex items-center gap-2`}>
            <FaCalendarAlt />
            <span>{formatDate(date)}</span>
          </div>
          
          {/* Showtimes grouped by movies */}
          <div className="p-4 space-y-4">
            {Object.keys(showData[date]).map(movieName => (
              <div key={`${date}-${movieName}`} className="mb-4">
                <div className="text-lg font-bold mb-3 flex items-center gap-2">
                  <FaFilm className={theme === 'cinema' ? 'text-red-500' : 'text-blue-500'} />
                  <span>{movieName}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {showData[date][movieName].map((showtime, index) => (
                    <div 
                      key={`${date}-${movieName}-${index}`} 
                      className={`p-3 rounded-lg ${getTimeClasses()} transition-all duration-200 cursor-pointer transform hover:scale-105 flex flex-col`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1 font-medium">
                          <FaRegClock />
                          <span>{showtime.startTime}</span>
                        </div>
                        <span className="text-xs opacity-80">to {showtime.endTime}</span>
                      </div>
                      
                      <div className="flex justify-between text-xs mt-1">
                        <div className="flex items-center gap-1">
                          <FaRegBuilding />
                          <span>{showtime.screenNo}</span>
                        </div>
                        <div className="flex items-center gap-1 mx-2">
                          <FaCouch />
                          <span>{showtime.availableSeats} seats</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Add global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .scale-102:hover {
    transform: scale(1.02);
  }
  
  .aspect-2\/3 {
    aspect-ratio: 2/3;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);