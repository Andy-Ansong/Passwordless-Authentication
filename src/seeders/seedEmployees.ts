import {employees} from "./data/employeeData"
import CustomSeeder from "../utils/customSeeder"
import Employee from "../model/Employee"

const EmployeeSeeder = new CustomSeeder(Employee, employees)

export default EmployeeSeeder