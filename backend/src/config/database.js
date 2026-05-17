import mongoose from "mongoose";
const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      console.log(`Mongodb connected `)
   } catch (error) {
      console.error("Database connection failed:", error.message);
      process.exit(1);
   }
};
export default connectDB;