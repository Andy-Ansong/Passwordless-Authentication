const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL, {})
.then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.error("Could not connect to database")
})

const db = mongoose.connection

module.exports = db