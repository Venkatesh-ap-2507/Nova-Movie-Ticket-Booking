import screenCollection from "../models/screen.js";
import seatCollection from "../models/seat.js";
import castCollection from '../models/cast.js';
import movieCollection from "../models/movie.js";
import showCollection from "../models/show.js";

const cast = {
    addCast: async (req, res) => {
        try {
            const { name, job, photoUrl } = req.body;
            const cast = new castCollection({ name: name.toLowerCase().trim(), job: job.toLowerCase().trim(), photo: photoUrl });
            await cast.save();
            res.status(200).json({ message: "Cast added successfully.", _id : cast._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getAllCast: async (req, res) => {
        try {
            const casts = await castCollection.find().lean();
            const updateCasts = casts.map(cast => ({
                ...cast,
                name: cast.name
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                job: cast.job
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
              }));
            res.status(200).json({
                message: "Cast fetched successfully.",
                data: updateCasts
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getCastById: async (req, res) => {
        try {
            const { castId } = req.params;
            const casts = await castCollection.find({ _id: castId }).lean();
            const updateCasts = casts.map(cast => ({
                ...cast,
                name: cast.name
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                job: cast.job
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
              }));
            res.status(200).json({
                message: "Cast fetched successfully.",
                data: updateCasts
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }, 
    getCastByMovieName: async (req, res) => {
        try {
            const { movieName } = req.params;
            console.log(movieName);
            const movie = await movieCollection.findOne({ name: movieName.trim() }).lean();
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            console.log(movie.casts);

            movie.casts = await castCollection.find({ _id: { $in: movie.casts } }).lean();
            const updateCasts = movie.casts.map(cast => ({
                ...cast,
                name: cast.name
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                job: cast.job
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
              }));

            res.status(200).json({
                message: "Cast fetched successfully.",
                data: updateCasts
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getCastAllOnGoingMovies: async (req, res) => {
        try {
            const { castId } = req.params;
            const shows = await showCollection.find({
                $and: [
                    { $or: [{ showTime: { $gt: new Date() } }, { showTime: { $exists: false } }] 
                    }
                ],
            });
            console.log(shows);
    
            const movieIds = shows.map(show => show.movie);
            const movies = await movieCollection.find({ _id: { $in: movieIds }, casts: castId, releasedDate: { $lt: new Date() } }).lean();
    
    
            res.status(200).json({
                message: "Ongoing movies fetched successfully for the given cast.",
                data: movies
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }    ,
    getCastAllCommingMovies: async (req, res) => {
        try {
            const { castId } = req.params;

            const movies = await movieCollection.find({ casts: castId, releasedDate: { $gt: new Date() } }).lean();
    
            res.status(200).json({
                message: "Ongoing movies fetched successfully for the given cast.",
                data: movies
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
};

export default cast;
