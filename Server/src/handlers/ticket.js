import ticketCollection from '../models/ticket.js';
import showSeatCollection from '../models/showSeat.js';
import seatCollection from '../models/seat.js';
import userCollection from '../models/user.js';

const ticket = {
  bookTicket: async (req, res) => {
    try {
      const { userId, showId, seatIds } = req.body;

      if (!userId || !showId || !seatIds) {
        return res.status(400).json({ error: 'User ID, Show ID, and seat IDs are required' });
      }

      if (!Array.isArray(seatIds)) {
        return res.status(400).json({ error: 'Seat IDs must be an array' });
      }

      if (seatIds.length === 0) {
        return res.status(400).json({ error: 'At least one seat ID is required' });
      }

      console.log(userId, showId, seatIds);

      // Step 1: Verify user
      const user = await userCollection.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Step 2: Verify show seats availability
      const showSeats = await showSeatCollection.find({
        _id : { $in: seatIds },
        show: showId,
        // seat: { $in: seatIds },
        isBooked: false
      });

      if (showSeats.length !== seatIds.length) {
        return res.status(400).json({ error: 'Some seats are already booked or invalid.' });
      }

      // Step 3: Mark seats as booked
      await showSeatCollection.updateMany(
        { show: showId, _id: { $in: seatIds } },
        { $set: { isBooked: true } }
      );

      // Step 4: Create ticket
      const newTicket = new ticketCollection({
        user: userId,
        show: showId,
        // seats: seatIds,
        showSeat: seatIds
      });

      await newTicket.save();

      return res.status(201).json({
        message: "Ticket booked successfully",
        ticket: newTicket
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  ticketDetails : async (req, res) => {
    try {
      const { ticketId } = req.params;
      // const ticket = await ticketCollection.findOne({ _id: ticketId }).populate('showSeat user show').sort({ [showSeat.show.showDate]: -1 });
      const ticketsGroupedByShow = await ticketCollection.aggregate([
        {
          $lookup: {
            from: 'shows',
            localField: 'show',
            foreignField: '_id',
            as: 'show'
          }
        },
        { $unwind: '$show' },
        {
          $group: {
            _id: '$show._id',
            showDetails: { $first: '$show' },
            tickets: { $push: '$$ROOT' }
          }
        },
        {
          $sort: { 'showDetails.showDate': -1 }
        }
      ]);
      
      if (!ticketsGroupedByShow) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.status(200).json({ message: "Ticket details fetched successfully.", data: ticketsGroupedByShow });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default ticket;
