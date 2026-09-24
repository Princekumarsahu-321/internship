import mongoose from "mongoose";
import dotenv from "dotenv"; // Fixed the typo here
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // await mongoose.connect(process.env.MONGO_URL_ON);

    // const isProduction = process.env.NODE_ENV === "production";

    // const mongoURL = isProduction
    //   ? process.env.MONGO_URL_ON || process.env.MONGO_URL
    //   : process.env.MONGO_URL;

    // if (!mongoURL) {
    //   const expectedVariable = isProduction
    //     ? "MONGO_URL_ON"
    //     : "MONGO_URL";

    //   throw new Error(`${expectedVariable} is not defined`);
    // }

    // if (!/^mongodb(?:\+srv)?:\/\//.test(mongoURL)) {
    //   throw new Error(
    //     "MongoDB connection string must start with mongodb:// or mongodb+srv://"
    //   );
    // }

    // await mongoose.connect(mongoURL, {
    //   serverSelectionTimeoutMS: 10000,
    // });

    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;