import mongoose from 'mongoose';
import colors from 'colors' ; // Import colors for colored console output
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;