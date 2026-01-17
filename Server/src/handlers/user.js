import showCollection from "../models/show.js";
import showSeatCollection from "../models/showSeat.js";
import movieCollection from "../models/movie.js";
import screenCollection from "../models/screen.js";
import seatCollection from "../models/seat.js";
import userCollection from "../models/user.js";
import ticketCollection from "../models/ticket.js";

const user = {
    addUser: async (req, res) => {
        const { name, mobile } = req.body;
        if (!name || !mobile) {
            return res.status(400).json({ error: 'Name and mobile are required' });
        }
        if (mobile.length !== 10) {
            return res.status(400).json({ error: 'Mobile number must be 10 digits' });
        }
        if (!/^\d+$/.test(mobile)) {
            return res.status(400).json({ error: 'Mobile number must be numeric' });
        }
        if (await userCollection.findOne({ mobile })) {
            return res.status(400).json({ error: 'User already exists', _id : await userCollection.findOne({ mobile })._id });
        }
        const user = new userCollection({ name: name.toLowerCase().trim(), mobile });
        await user.save();
        res.status(200).json({ message: "User added successfully.", data: user });
    },
    getUser: async (req, res) => {
        const { mobile } = req.body;
        if (!name || !mobile) {
            return res.status(400).json({ error: 'Name and mobile are required' });
        }
        if (mobile.length !== 10) {
            return res.status(400).json({ error: 'Mobile number must be 10 digits' });
        }
        if (!/^\d+$/.test(mobile)) {
            return res.status(400).json({ error: 'Mobile number must be numeric' });
        }
        const user = await userCollection.findOne({ mobile });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: "Shows fetched successfully.", user : await userCollection.findOne({ mobile }) });
    },
    getUserAllTicket : async (req, res) => {
        const { userId } = req.params;
        const tickets = await ticketCollection.find({ user: userId }).populate('showSeat user show');
        if (!tickets) {
            return res.status(404).json({ error: 'Tickets not found' });
        }
        res.status(200).json({ message: "Tickets fetched successfully.", data: tickets });
    }

};

export default user;
