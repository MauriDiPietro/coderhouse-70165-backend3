import mongoose from "mongoose";
import config from "./config.js";


export const initMongoDB = async()=>{
    try {
        await mongoose.connect(config.MONGO_URL)
    } catch (error) {
        throw new Error(error)
    }
}

