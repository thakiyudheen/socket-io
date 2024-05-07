import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

export const connectdb = async (): Promise<void> => {
  try {
     mongoose.connect(process.env.MONGO_URI as string).then(()=>{
      console.log("MongoDB connected");
    })
    
  } catch (err: any) {
    console.error("Error connecting to MongoDB:", err);
  }
};
