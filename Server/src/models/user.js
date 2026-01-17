import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String },
  mobile: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
});
const userCollection = mongoose.model('User', userSchema);
export default userCollection;