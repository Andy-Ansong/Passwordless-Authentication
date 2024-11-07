import { employees } from '@data/employeeData'; // Adjust path as needed
import CustomSeeder from '@utils/customSeeder'; // Adjust path as needed
import Employee, { IEmployee } from '@model/Employee'; // Assuming Employee model and IEmployee interface are defined

const EmployeeSeeder = new CustomSeeder<IEmployee>(Employee, employees);

export default EmployeeSeeder;
