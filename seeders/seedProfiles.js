const Profile = require("../model/Profile")
const CustomSeeder = require("../utils/customSeeder")
const data = require("./Profile.json")

const ProfileSeeder = new CustomSeeder(Profile, data)

module.exports = ProfileSeeder