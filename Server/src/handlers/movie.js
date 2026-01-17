import { get } from 'mongoose';
import movieCollection from '../models/movie.js';
import genreCollection from '../models/genre.js';
import castCollection from '../models/cast.js';
import languageCollection from '../models/language.js';
import showCollection from '../models/show.js';

const movie = {
  addMovie: async (req, res) => {
    try {
      const { name, photoUrls, casts, languages, genres, comming, filmCertificate, description, releasedDate, time } = req.body;

      const newGenre = await Promise.all(
        genres.map(async (genre) => {
          const existingGenre = await genreCollection.findOne({ name: genre.toLowerCase().trim() });
          return existingGenre ? existingGenre._id : null;
        })
      );

      // Remove any null values
      const filteredGenres = newGenre.filter(id => id !== null);

      const movie = new movieCollection({
        name,
        photoUrls,
        casts,
        languages,
        genres: filteredGenres,
        comming,
        filmCertificate,
        description,
        releasedDate,
        time
      });

      await movie.save();

      res.status(201).json({ message: "Movie created successfully", data: movie });

      res.status(200).json({ message: "Cast added successfully.", _id: movie._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getAllMovie: async (req, res) => {
    try {
      const movies = await movieCollection
        .find()
        .populate('casts')
        .populate('languages')
        .sort({ releasedDate: -1 })
        .lean();

      for (const movie of movies) {
        const genrePromises = movie.genres.map(async (genreId) => {
          const genre = await genreCollection.findOne({ _id: genreId }).lean();
          return genre ? genre.name : null;
        });

        const genresNames = await Promise.all(genrePromises);
        movie.genres = genresNames.filter(name => name !== null); // remove nulls if any
      }

      res.status(200).json({
        message: "Movie fetched successfully.",
        data: movies
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getAllMovieUpcomingOngoing: async (req, res) => {
    try {
      const now = new Date();
  
      // Upcoming movies
      const upcomingMovies = await movieCollection
        .find({ releasedDate: { $gte: now } })
        .populate('languages')
        .sort({ releasedDate: -1 })
        .lean();
  
      // Get past shows
      const pastShows = await showCollection.find({ showDate: { $gte: now } });
  
      // Extract unique movie IDs from past shows
      const movieIds = [...new Set(pastShows.map(show => show.movie.toString()))];
  
      // Get ongoing movies
      const ongoingMovies = await movieCollection
        .find({ _id: { $in: movieIds }, releasedDate: { $lte: now } })
        .populate('languages')
        .lean();
  
      // Combine both
      const movies = [...upcomingMovies, ...ongoingMovies];

      for (const movie of movies) {
        const castPromises = movie.casts.map(async (castId) => {
          const cast = await castCollection.findOne({ _id: castId }).lean();
          return cast ? cast.name : null;
        });
  
        const castsNames = await Promise.all(castPromises);
        movie.casts = castsNames.filter(name => name !== null);
      }

      console.log("movies", movies);
  
      res.status(200).json({
        message: "Movies fetched successfully.",
        data: movies
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  getMovie: async (req, res) => {
    const { movieId } = req.params;
    try {
      const movie = await movieCollection.findOne({ _id: movieId }).populate('casts');

      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      res.status(200).json({
        message: "Movie fetched successfully.",
        data: movie
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getUpCommingMovie: async (req, res) => {
    try {
      const movies = await movieCollection
        .find({ releasedDate: { $gte: new Date() } })
        // .populate('casts')
        .populate('languages')
        .sort({ releasedDate: -1 })
        .lean();

      for (const movie of movies) {
        const genrePromises = movie.genres.map(async (genreId) => {
          const genre = await genreCollection.findOne({ _id: genreId }).lean();
          return genre ? genre.name : null; // remove nulls if any
        });

        const genresNames = await Promise.all(genrePromises);
        movie.genres = genresNames.filter(name => name !== null); // remove nulls if any
      }

      res.status(200).json({
        message: "Movie fetched successfully.",
        data: movies
      });    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getOnGoingMovie : async (req, res) => {
    try {
      const shows = await showCollection.find({ showDate: { $gte: new Date() } });
      console.log(shows);
      const movies = [];
      for (const show of shows) {
        const movie = await movieCollection.findOne({ _id: show.movie, releasedDate: { $lte: new Date() } });
        if (movie) {
          movies.push(movie);
        }
      }


      res.status(200).json({
        message: "Movie fetched successfully.",
        data: movies
      });    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

};

export default movie;
