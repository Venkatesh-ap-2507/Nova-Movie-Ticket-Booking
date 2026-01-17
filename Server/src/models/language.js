import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const languageSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true, unique: true },
});
const languageCollection = mongoose.model('Language', languageSchema);
export default languageCollection;