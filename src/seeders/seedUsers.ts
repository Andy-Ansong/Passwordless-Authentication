import User from "../model/User"
import {employees} from "./data/userData"
import CustomSeeder from "../utils/customSeeder"

const UserSeeder = new CustomSeeder(User, employees)

export default UserSeeder