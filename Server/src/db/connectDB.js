// database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const pass = process.env.MONGO_PASSWORD;
const user = process.env.MONGO_USER;

const mongoUrl = 'mongodb+srv://' + user + ':' + pass + '@cluster0.9paog.mongodb.net/nova?retryWrites=true&w=majority&appName=Cluster0'
const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB with Mongoose');
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
