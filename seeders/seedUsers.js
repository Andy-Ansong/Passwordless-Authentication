const User = require("../model/User")
const data = require("./User.json")
const CustomSeeder = require("../utils/customSeeder")

const UserSeeder = new CustomSeeder(User, data)

module.exports = UserSeeder