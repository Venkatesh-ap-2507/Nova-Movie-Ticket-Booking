import dotenv from 'dotenv';

dotenv.config();

import connectToDatabase from './src/db/connectDB.js';
import express from 'express';
import cors from 'cors';
import adminRouth from './src/routh/adminRouth.js';
import userRouth from './src/routh/userRouth.js';
// import './src/models/setup.js';

// require("dotenv").config();

// import { valid_user, valid_admin } from './src/permission/permission.js'

const app = express();
const PORT = process.env.NOVA_PORT || 3004;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/uploads", express.static("uploads"));

app.use('/api/adminCall',  adminRouth );
app.use('/api',  userRouth );


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
