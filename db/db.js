import * as dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

mongoose.connect(process.env.MONGODB_URL, {})
.then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.error("Could not connect to database")
})

const db = mongoose.connection

export default db