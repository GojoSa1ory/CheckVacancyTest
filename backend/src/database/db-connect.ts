import mongoose from "mongoose"
import { MONGO_URI } from "../config/env"

const connectToDb = async () => {
    try {
        await mongoose.connect(MONGO_URI)
    } catch (error) {
        console.log("Could not connect to database", error)
        process.exit(1)
    }
}

export default connectToDb