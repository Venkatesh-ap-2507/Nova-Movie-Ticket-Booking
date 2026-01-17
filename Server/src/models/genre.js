import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const genreSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
});

const genreCollection = mongoose.model('Genre', genreSchema);
export default genreCollection;
