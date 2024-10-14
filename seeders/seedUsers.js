import User from "../model/User.js"
import {users} from "./User.js"
import CustomSeeder from "../utils/customSeeder.js"

const UserSeeder = new CustomSeeder(User, users)

export default UserSeeder