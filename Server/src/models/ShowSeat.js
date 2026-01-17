import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const showSeatSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  show: { type: String, ref: 'Show', required: true },
  seat: { type: String, ref: 'Seat', required: true },
  price: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const showSeatCollection = mongoose.model('ShowSeat', showSeatSchema);
export default showSeatCollection;
