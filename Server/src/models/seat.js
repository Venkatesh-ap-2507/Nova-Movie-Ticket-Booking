import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const seatSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  label: { type: String, required: true }, // e.g., "A1"
  row: { type: String, required: true },
  screen: { type: String, ref: 'Screen' },
});
const seatCollection = mongoose.model('Seat', seatSchema);
export default seatCollection;