import mongoose from "mongoose";
import { MONGO_OPTIONS } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(
      MONGO_OPTIONS.DB.URI as string,
      MONGO_OPTIONS.OPTIONS
    );
    const connection = mongoose.connection;

    // const connection = await mongoose.connect(MONGO_OPTIONS.DB.URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    // const url = `${connection.connection.host}: ${connection.connection.port}`;
    const url = `${connection.host}: ${connection.port}`;

    console.log(`Connection with MONGODB in: ${url}`);
  } catch (error) {
    console.log(error);
    console.log(MONGO_OPTIONS.DB.URI);
    // console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
