// // Node.js version of the LangChain-based movie assistant using LangChain.js

// import dotenv from 'dotenv';
// dotenv.config();

// import axios from 'axios';
// import { ChatOpenAI } from 'langchain/chat_models';
// import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents';
// import { StructuredTool } from 'langchain/tools';
// import {
//   ChatPromptTemplate,
//   SystemMessagePromptTemplate,
//   HumanMessagePromptTemplate,
// } from 'langchain/prompts';
// import { ConversationEntityMemory } from 'langchain/memory';

// const url = 'http://localhost:3004/api/adminCall/';

// let lastMovieName = null;

// const get_movies = async () => {
//   console.log('get_movies');
//   const response = await axios.get(url + 'get-movies-upcoming-ongoing');
//   return response.data;
// };

// const show_available_seats_in_show = async (show_id) => {
//   console.log('get_show_seats_by_show_id');
//   const response = await axios.get(url + `get-show-seats-by-showid/${show_id}`);
//   return response.data;
// };

// const get_all_shows = async () => {
//   console.log('get_all_shows');
//   const response = await axios.get(url + 'get-all-shows');
//   return response.data;
// };

// const get_cast_of_movie_safe = async (movie_name) => {
//   if (!movie_name) movie_name = lastMovieName;
//   if (movie_name) {
//     lastMovieName = movie_name;
//     console.log('get_cast_of_movie_safe', movie_name);
//     const response = await axios.get(url + `get-cast-by-moviename/${movie_name}`);
//     return response.data;
//   }
//   return { error: 'Movie name missing' };
// };

// const system_template = `
// You are a helpful assistant for a movie theater booking system. Users may refer to entities (movies, shows) by name or contextually (e.g., "this movie"). Always resolve context from conversation memory if an identifier is not explicitly provided.

// Tasks you can perform:
// 1. List Available Movies
// 2. List Shows for Movies
// 3. Showtimes for Movies
// 4. Check Seat Availability
// 5. Get Cast Information
// 6. Ticket Booking

// Guidelines:
// - Always call tools. Never guess answers.
// - Use memory to understand context like "this movie"
// - Be clear and conversational
// `;

// const tools = [
//   new StructuredTool({ name: 'get_movies', func: get_movies, description: 'Get list of upcoming and ongoing movies' }),
//   new StructuredTool({ name: 'show_avilable_seats_in_show', func: show_available_seats_in_show, description: 'Get available seats in a show by show ID' }),
//   new StructuredTool({ name: 'get_all_shows', func: get_all_shows, description: 'Get all shows and availability' }),
//   new StructuredTool({ name: 'get_cast_of_movie', func: get_cast_of_movie_safe, description: "Get cast of a movie by movie name (resolves 'this movie' from memory)" })
// ];

// const llm = new ChatOpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 });

// const prompt = ChatPromptTemplate.fromMessages([
//   SystemMessagePromptTemplate.fromTemplate(system_template),
//   HumanMessagePromptTemplate.fromTemplate('{input}'),
//   SystemMessagePromptTemplate.fromTemplate('{agent_scratchpad}')
// ]);

// const memory = new ConversationEntityMemory({ llm, returnMessages: true });

// const setupAgent = async () => {
//   const agent = await createOpenAIFunctionsAgent({ llm, tools, prompt });
//   return new AgentExecutor({ agent, tools, memory, verbose: true });
// };

// const chatHistory = [];

// export const chat_with_agent = async (message) => {
//   try {
//     const agentExecutor = await setupAgent();
//     const result = await agentExecutor.invoke({ input: message });
//     chatHistory.push([message, result.output]);
//     return chatHistory.map(([m, r]) => `User: ${m}\nAI: ${r}`).join('\n\n');
//   } catch (err) {
//     return `Error: ${err.message}`;
//   }
// };



// export const send_message = async (req, res) => {
//   const message = req.body.message;
//   const response = await chat_with_agent(message);
//   res.send(response);
// };
