import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const priceSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  seat: { type: String, ref: 'Seat' },
  amount: { type: Number, required: true },
});
const priceCollection = mongoose.model('Price', priceSchema);
export default priceCollection;