import showCollection from "../models/show.js";
import showSeatCollection from "../models/showSeat.js";
import movieCollection from "../models/movie.js";
import screenCollection from "../models/screen.js";
import seatCollection from "../models/seat.js";
import castCollection from "../models/cast.js";
import genreCollection from "../models/genre.js";
import { get } from "mongoose";
import languageCollection from "../models/language.js";


function timeStringToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

const show = {
    addShow: async (req, res) => {
        try {
            const { movie, screen, showDate, startTime, price } = req.body;

            const movieExists = await movieCollection.findOne({ _id: movie });
            if (!movieExists) {
                return res.status(404).json({ error: 'Movie not found' });
            }

            const movieHours = movieExists.time.hours;
            const movieMinutes = movieExists.time.minutes;

            // Calculate endTime
            const [startHours, startMinutes] = startTime.split(':').map(Number);
            const startDateTime = new Date(showDate);
            startDateTime.setHours(startHours);
            startDateTime.setMinutes(startMinutes);

            const endDateTime = new Date(startDateTime);
            endDateTime.setHours(endDateTime.getHours() + movieHours);
            endDateTime.setMinutes(endDateTime.getMinutes() + movieMinutes);

            const endTime = `${String(endDateTime.getHours()).padStart(2, '0')}:${String(endDateTime.getMinutes()).padStart(2, '0')}`;

            // Check for time conflict
            const shows = await showCollection.find({ screen, showDate });

            for (const s of shows) {
                const sStartMinutes = timeStringToMinutes(s.startTime);
                const sEndMinutes = timeStringToMinutes(s.endTime);

                const newStartMinutes = timeStringToMinutes(startTime);
                const newEndMinutes = timeStringToMinutes(endTime);

                console.log("Existing show:", s.startTime, s.endTime);
                console.log("New show:", startTime, endTime);

                // Proper overlap condition
                if (newStartMinutes < sEndMinutes && newEndMinutes > sStartMinutes) {
                    return res.status(400).json({ error: 'Time conflict with another show' });
                }
            }

            const screen__ = await screenCollection
                .findOne({ _id: screen })
                .select('seats')
                .populate('seats')
                .lean();

            if (!screen__) {
                return res.status(404).json({ error: 'Screen not found' });
            }

            const seatLabel = [];
            screen__.seats.forEach(seat => {
                const row = seat.row;
                if (!seatLabel.includes(row)) {
                    seatLabel.push(row);
                }
            });

            const priceKeys = Object.keys(price);
            const missing = seatLabel.filter(label => !priceKeys.includes(label));
            if (missing.length > 0) {
                return res.status(400).json({ error: `Invalid price for seats: ${missing.join(', ')}` });
            }

            //  Create the Show
            const newShow = new showCollection({
                movie,
                screen,
                showDate,
                startTime,
                endTime
            });
            await newShow.save();

            //  Create ShowSeat entries
            const showSeats = screen__.seats.map(seat => {
                return {
                    show: newShow._id,
                    seat: seat._id,
                    price: price[seat.row], // price based on seat row
                    isBooked: false
                };
            });

            await showSeatCollection.insertMany(showSeats);

            return res.status(201).json({ message: "Show and seats added successfully.", _id: newShow._id });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getAllShows: async (req, res) => {
        try {
            // const shows = await showCollection.find().populate('movie screen');

            // for (const show of shows) {
            //     // Replace movie.casts with actual cast documents
            //     const castDocs = await Promise.all(
            //         show.movie.casts.map(castId => castCollection.findById(castId).lean())
            //     );
            //     show.movie.casts = castDocs;

            //     // Replace movie.languages with actual language documents
            //     const languageDocs = await Promise.all(
            //         show.movie.languages.map(langId => languageCollection.findById(langId).lean())
            //     );
            //     show.movie.languages = languageDocs;

            //     // Replace movie.genres with actual genre documents
            //     const genreDocs = await Promise.all(
            //         show.movie.genres.map(genreId => genreCollection.findById(genreId).lean())
            //     );
            //     show.movie.genres = genreDocs;

            //     // Clean up screen object (remove seats)
            //     if (show.screen) {
            //         const { seats, ...rest } = show.screen.toObject();
            //         show.screen = rest;
            //     }

            //     // show
            //     const showSeat = await showSeatCollection.find({ show: show._id }).populate('seat').lean();
            //     console.log(showSeat)
            //     show.showSeats = showSeat;

            // }

            const shows = await showCollection.find().populate('movie screen');

            const result = [];

            for (const show of shows) {
                const showObj = show.toObject();

                // Replace movie.casts with actual cast documents
                showObj.movie.casts = await Promise.all(
                    showObj.movie.casts.map(castId => castCollection.findById(castId).lean())
                );

                // Replace movie.languages with actual language documents
                showObj.movie.languages = await Promise.all(
                    showObj.movie.languages.map(langId => languageCollection.findById(langId).lean())
                );

                // Replace movie.genres with actual genre documents
                showObj.movie.genres = await Promise.all(
                    showObj.movie.genres.map(genreId => genreCollection.findById(genreId).lean())
                );

                // Clean up screen object (remove seats)
                if (showObj.screen) {
                    const { seats, ...screenWithoutSeats } = showObj.screen;
                    showObj.screen = screenWithoutSeats;
                }

                // Add showSeats
                const showSeats = await showSeatCollection.find({ show: show._id })
                    .populate('seat')
                    .lean();

                // Group available seats by row and price
                const seatMap = {};
                let totalAvailableSeats = 0;

                for (const seat of showSeats) {
                    if (!seat.seat || seat.isBooked) continue;

                    const key = `${seat.seat.row}_${seat.price}`;
                    if (!seatMap[key]) {
                        seatMap[key] = {
                            row: seat.seat.row,
                            price: seat.price,
                            seats: []
                        };
                    }
                    seatMap[key].seats.push(seat.seat.label);
                    totalAvailableSeats += 1;
                }

                const groupedSeats = Object.values(seatMap);
                showObj.showSeats = groupedSeats;
                showObj.totalAvailableSeats = totalAvailableSeats;


                result.push(showObj);
            }


            res.status(200).json({ message: "Shows fetched successfully.", data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }

        // try {
        //     const shows = await showCollection.find().populate('movie screen');
        //     res.status(200).json({ message: "Shows fetched successfully.", data: shows });
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: 'Internal server error' });
        // }
    },

    getShowByShowId: async (req, res) => {
        try {
            const { showId } = req.params;
            const show = await showCollection.findOne({ _id: showId }).populate('movie screen');
            if (!show) {
                return res.status(404).json({ error: 'Show not found' });
            }
            res.status(200).json({ message: "Show fetched successfully.", data: show });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getShowSeatsByShowId: async (req, res) => {
        try {
            const { showId } = req.params;
            const showSeats = await showSeatCollection.find({ show: showId }).populate('seat');
            if (!showSeats) {
                return res.status(404).json({ error: 'Show not found' });
            }
            res.status(200).json({ message: "Show seats fetched successfully.", data: showSeats });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getShowAvailableSeatsByShowId: async (req, res) => {
        try {
            const { showId } = req.params;

            const showSeats = await showSeatCollection.find({ show: showId }).populate('seat');
            // const showSeats = await showSeatCollection.find({ show: showId, isBooked: false }).populate('seat');

            if (!showSeats || showSeats.length === 0) {
                return res.status(404).json({ error: 'No available seats found for this show.' });
            }

            const formattedSeats = showSeats.map(showSeat => ({
                seatId: showSeat._id,
                seatLabel: showSeat.seat?.label || '',
                price: showSeat.price,
                isBooked: showSeat.isBooked
            }));

            res.status(200).json({
                message: "Available seats fetched successfully.",
                data: formattedSeats
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    // getShowAvailableSeatsByShowId: async (req, res) => {
    //     try {
    //         const { showId } = req.params;
    //         const showSeats = await showSeatCollection.find({ show: showId }).populate('seat');

    //         if (!showSeats) {
    //             return res.status(404).json({ error: 'Show not found' });
    //         }
    //         const avilableSeats = showSeats.filter(showSeat => showSeat.isBooked === false);
    //         res.status(200).json({ message: "Show seats fetched successfully.", data: avilableSeats });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // },
    // getAvailableSeatsByMovieId: async (req, res) => {
    //     try {
    //         const { movieId } = req.params;
    //         const shows = await showCollection.find({ movie: movieId });
    //         if (!shows) {
    //             return res.status(404).json({ error: 'Movie not found' });
    //         }
    //         const availableSeats = [];
    //         for (const show of shows) {
    //             const showSeats = await showSeatCollection.find({ show: show._id });
    //             availableSeats.push(...showSeats.filter(seat => !seat.isBooked));
    //         }
    //         res.status(200).json({ message: "Available seats fetched successfully.", data: availableSeats });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // }
    getAvailableSeatsByMovieId: async (req, res) => {
        try {
            const { movieId } = req.params;

            const shows = await showCollection.find({ movie: movieId });

            if (!shows || shows.length === 0) {
                return res.status(404).json({ error: 'Movie not found or no shows available' });
            }

            const result = [];

            for (const show of shows) {
                const showSeats = await showSeatCollection.find({ show: show._id }).populate('seat');
                // const showSeats = await showSeatCollection.find({ show: show._id, isBooked: false }).populate('seat');

                result.push({
                    showId: show._id,
                    showDate: show.showDate,
                    startTime: show.startTime,
                    endTime: show.endTime,
                    availableSeats: showSeats.map(seat => ({
                        seatId: seat._id,
                        seatLabel: seat.seat?.label || '',
                        price: seat.price,
                        isBooked: seat.isBooked
                    }))
                });
            }

            res.status(200).json({ message: "Available seats grouped by show fetched successfully.", data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getListOfShowsByMovieId: async (req, res) => {
        try {
            const { movieId } = req.params;
            const shows = await showCollection.find({ movie: movieId });
            if (!shows) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            res.status(200).json({ message: "Shows fetched successfully.", data: shows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

};

export default show;
