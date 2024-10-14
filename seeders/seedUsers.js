import User from "../model/User.js"
import {employees} from "./User.js"
import CustomSeeder from "../utils/customSeeder.js"

const UserSeeder = new CustomSeeder(User, employees)

export default UserSeeder