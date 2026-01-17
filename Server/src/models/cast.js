import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const castSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  job: { type: String, required: true }, // e.g., actor, director
  photo: { type: String, required: true },
});
const castCollection = mongoose.model('Cast', castSchema);
export default castCollection;