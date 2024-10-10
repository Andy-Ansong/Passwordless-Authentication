const mongoose = require("mongoose")
const UserSeeder = require("../seeders/seedUsers")
const ProfileSeeder = require("../seeders/seedProfiles")
const AdminSeeder = require("../seeders/seedAdmin")

const seedersList = {
    UserSeeder, AdminSeeder, ProfileSeeder
}

mongoose.connect(process.env.MONGODB_URL, {})
.then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.error("Could not connect to database")
})

const db = mongoose.connection

module.exports = db