import adminCollection from '../models/admin.js';
// import { __filename, __dirname } from '../../utils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const auth = {
  adminLogin: async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const existingAdmin = await adminCollection.findOne({ email });
      if (!existingAdmin) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
      const isPasswordValid = await bcrypt.compare(password, existingAdmin.hashedPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
      const token = jwt.sign({ email: existingAdmin.email, role: 'admin' }, SECRET_KEY, { expiresIn: '30h' });
      res.status(200).json({ token, message : "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  },

};

export default auth;
