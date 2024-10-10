const {Seeder} = require("mongoose-data-seed")
const Profile = require("../model/Profile")
const data = require("./Profile.json")

const ProfileSeeder = new CustomSeeder(Profile, data)

module.exports = ProfileSeeder