import screenCollection from "../models/screen.js";
import seatCollection from "../models/seat.js";

const screens = {
  addScreen: async (req, res) => {
    const { screenName, rowLabels, NUM_COLS } = req.body;
    console.log(screenName, rowLabels, NUM_COLS);

    const existingScreen = await screenCollection.findOne({ name: screenName.toLowerCase().trim() });
    if (existingScreen) {
      console.log("Screen name already exists.");
      res.status(400).json({ error: 'Screen name already exists.' });
      return;
    }
    else {
      const newScreen = new screenCollection({ name: screenName.toLowerCase().trim() });

      for (let i = 0; i < rowLabels.length; i++) {
        for (let j = 0; j < NUM_COLS ; j++) {
          const seatLabel = `${rowLabels[i]}${j + 1}`;
          const newSeat = new seatCollection({ label: seatLabel, row: rowLabels[i], screen: screenName });
          await newSeat.save();
          newScreen.seats.push(newSeat._id);
        }
      }

      await newScreen.save();

      res.status(200).json({ message: "Screen added successfully.", _id:newScreen._id });
    }
  },

  getScreens: async (req, res) => {
    try {
      // const screens = await screenCollection.find().populate('seats');
      const screens = await screenCollection.find().populate('seats').lean();

      const screensWithSeatCount = screens.map(screen => ({
        ...screen,
        seatCount: screen.seats.length,
        // seats: undefined,
      }));

      // console.log(screensWithSeatCount);
      res.status(200).json(screensWithSeatCount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  ,
  getScreen: async (req, res) => {
    const { screenId } = req.params;
    try {
      const screen = await screenCollection.findOne({ _id: screenId }).populate('seats');

      if (!screen) {
        return res.status(404).json({ error: 'Screen not found' });
      }

      // Group seats by row and count them
      const seatCountsByRow = {};

      screen.seats.forEach(seat => {
        const row = seat.row;
        seatCountsByRow[row] = (seatCountsByRow[row] || 0) + 1;
      });

      res.status(200).json({
        _id: screen._id,
        name: screen.name,
        seatCountsByRow,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

};

export default screens;
