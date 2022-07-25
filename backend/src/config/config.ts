import { MONGO_OPTIONS_INTERFACE } from "./type";
import dotenv from "dotenv";
// enviroment variables config
dotenv.config();

export const MONGO_OPTIONS: MONGO_OPTIONS_INTERFACE = {
  DB: {
    URI: process.env.MONGO_URI as string,
  },
  OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
