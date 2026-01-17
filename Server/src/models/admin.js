import mongoose from 'mongoose'; 

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
});

const adminCollection = mongoose.model('Admin', adminSchema);
export default adminCollection;
