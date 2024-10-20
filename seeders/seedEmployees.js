import {employees} from "./data/employeeData.js"
import CustomSeeder from "../utils/customSeeder.js"
import Employee from "../model/Employee.js"

const EmployeeSeeder = new CustomSeeder(Employee, employees)

export default EmployeeSeeder