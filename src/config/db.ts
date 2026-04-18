import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Databased connected', conn.connection.host);
    
  } catch (error) {
    console.log(`There was an error: ${error}`);
    process.exit(1);
  }
} 