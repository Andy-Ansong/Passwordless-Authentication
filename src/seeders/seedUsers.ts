import User, { IUser } from '@model/User'; // Importing User model and IUser interface
import { employees } from '@data/userData'; // Adjust path as needed
import CustomSeeder from '@utils/customSeeder'; // Adjust path as needed

// Create an instance of CustomSeeder with the User model and employees data
const UserSeeder = new CustomSeeder<IUser>(User, employees);

export default UserSeeder;
