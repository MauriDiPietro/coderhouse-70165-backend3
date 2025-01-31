import { connect } from "mongoose";
import config from "./config";

export const dbConnection = async (): Promise<void> => {
  try {
    await connect(config.MONGO_URL);
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};
