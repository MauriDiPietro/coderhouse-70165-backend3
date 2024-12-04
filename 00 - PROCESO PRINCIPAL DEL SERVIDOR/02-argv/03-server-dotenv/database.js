import mongoose from "mongoose";
import dotenv from 'dotenv'

const ENV = process.argv[2];
dotenv.config({ path: ENV === 'prod' ? './.env.prod' : ENV === 'dev' ? './.env.dev' : './.env' })

export const initMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        throw new Error(error)
    }
}

