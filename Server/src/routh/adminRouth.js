import express from 'express';
import auth from '../handlers/auth.js';
import screens from '../handlers/sceens.js';
import cast from '../handlers/cast.js'
import movie from '../handlers/movie.js';
import language from '../handlers/language.js';
import show from '../handlers/show.js';
import user from '../handlers/user.js';
import ticket from '../handlers/ticket.js';



const router = express.Router();




router.post("/login", auth.adminLogin);

router.post("/add-cast", cast.addCast);
router.get("/get-casts", cast.getAllCast);
router.get("/get-cast/:castId", cast.getCastById);
router.get("/get-cast-by-moviename/:movieName", cast.getCastByMovieName);

// http://localhost:3004/api/adminCall/get-cast/b86f1b58-d7da-4dce-9eca-d398e8f8d3a6
router.get("/get-cast-ongoing-movies/:castId", cast.getCastAllOnGoingMovies);
// http://localhost:3004/api/adminCall/get-cast-ongoing-movies/74d10224-7887-44a2-9d00-898789b7581d
router.get("/get-cast-comming-movies/:castId", cast.getCastAllCommingMovies);
// http://localhost:3004/api/adminCall/get-cast-comming-movies/b86f1b58-d7da-4dce-9eca-d398e8f8d3a6



router.post("/add-movie", movie.addMovie);
router.get("/get-movies", movie.getAllMovie);
router.get("/get-movies-upcoming-ongoing", movie.getAllMovieUpcomingOngoing);
// http://localhost:3004/api/adminCall/get-movies-upcoming-ongoing
router.get("/get-movie/:movieId", movie.getMovie);
router.get("/get-upcomming-movies", movie.getUpCommingMovie);
// http://localhost:3004/api/adminCall/get-upcomming-movies
router.get("/get-ongoing-movies", movie.getOnGoingMovie);
// http://localhost:3004/api/adminCall/get-ongoing-movies
router.get("/get-available-seats-by-movieid/:movieId", show.getAvailableSeatsByMovieId);
// http://localhost:3004/api/adminCall/get-available-seats-by-movieid/617fc2f4-3b60-413a-97ee-1d38d02636d9
router.get("/get-list-of-shows-by-movieid/:movieId", show.getListOfShowsByMovieId);
// http://localhost:3004/api/adminCall/get-list-of-shows-by-movieid/617fc2f4-3b60-413a-97ee-1d38d02636d9


router.post("/add-screen", screens.addScreen);
router.get("/get-screens", screens.getScreens);
router.get("/get-screen/:screenId", screens.getScreen);



router.post("/add-language", language.addLanguage);
router.get("/get-languages", language.getLanguages);




router.post("/add-show", show.addShow);
router.get("/get-show-by-showid/:showId", show.getShowByShowId);
// http://localhost:3004/api/adminCall/get-show-by-showid/5898186f-8706-4613-8cd3-4a320d69552b
router.get("/get-all-shows", show.getAllShows);
// http://localhost:3004/api/adminCall/get-all-shows
router.get("/get-show-seats-by-showid/:showId", show.getShowSeatsByShowId);
// http://localhost:3004/api/adminCall/get-show-seats-by-showid/8289d4dc-4381-4521-abda-d8f950798de3
router.get("/get-show-available-seats-by-showid/:showId", show.getShowAvailableSeatsByShowId);
// http://localhost:3004/api/adminCall/get-show-available-seats-by-showid/8289d4dc-4381-4521-abda-d8f950798de3



router.post("/add-user", user.addUser);
router.post("/get-user", user.getUser);
router.get("/get-user-all-ticket/:userId", user.getUserAllTicket);
// http://localhost:3004/api/adminCall/get-user-all-ticket/2e3b0831-0dbc-4f6a-8220-34200857b985

router.post("/book-ticket", ticket.bookTicket);
router.get("/book-ticket/:ticketId", ticket.ticketDetails);
// http://localhost:3004/api/adminCall/book-ticket/838f6701-ecf9-43b2-88fd-575356108919




export default router;

