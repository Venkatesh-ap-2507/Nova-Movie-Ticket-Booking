import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const screenSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true, unique: true },
  seats: [{ type: String, ref: 'Seat' }],
});
const screenCollection = mongoose.model('Screen', screenSchema);
export default screenCollection;