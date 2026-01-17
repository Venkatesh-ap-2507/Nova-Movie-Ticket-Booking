import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  user: { type: String, ref: 'User', required: true },
  show: { type: String, ref: 'Show', required: true },
  showSeat: [{ type: String, ref: 'ShowSeat' }],
  bookedAt: { type: Date, default: Date.now },
});
const ticketCollection = mongoose.model('Ticket', ticketSchema);
export default ticketCollection;