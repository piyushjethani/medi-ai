import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Warning: Could not connect to local database. The app will run in fallback (memory) mode without saving chat history.`);
        // We removed process.exit(1) so the server stays alive even if they don't have MongoDB installed
    }
};

export default connectDB;
