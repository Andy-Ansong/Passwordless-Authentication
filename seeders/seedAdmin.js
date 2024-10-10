const User = require("../model/User")
const data = require("./Admin.json")
const CustomSeeder = require("../utils/customSeeder")

const AdminSeeder = new CustomSeeder(User, data)

module.exports = AdminSeeder