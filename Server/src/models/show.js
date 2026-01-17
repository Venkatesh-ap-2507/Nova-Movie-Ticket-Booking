import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const showSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  movie: { type: String, ref: 'Movie', required: true },
  screen: { type: String, ref: 'Screen', required: true },
  showDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const showCollection = mongoose.model('Show', showSchema);
export default showCollection;
