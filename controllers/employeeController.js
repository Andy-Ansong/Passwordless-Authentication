import role from "../middleware/role.js"
import Employee from "../model/Employee.js"
import User from "../model/User.js"
import errorHandler from "../utils/errorHandler.js"
import pagination from '../utils/pagination.js'
import search from '../utils/searchModel.js'
import sort from '../utils/sortModel.js'

const createEmployee = errorHandler(async(req, res) => {
    const user = await User.findOne({email: req.body.email}).exec()
    if(!user){
        return res.status(404).send({
            status: "error",
            message: `User does not exist.`
        })
    }
    const employee = await Employee.findOne({email: req.body.email}).exec()
    if(employee){
        return res.status(409).send({
            status: "error",
            message: `${req.body.name}'s profile already exists.`
        })
    }
    const new_employee = new Employee({
        ...req.body,
        userId: user._id,
    })
    await new_employee.save()
    return res.status(201).send({
        status: "success",
        message: `${new_employee.name}'s profile created successfully.`,
    })
})

const getEmployeeById = errorHandler(async(req, res) => {
    const employeeId = req.params.employee_id
    const employee = await Employee.findById(employeeId).exec()
    if(!employee){
        return res.status(404).send({
            status: "error",
            message: "Employee not found."
        })
    }
    return res.status(200).send({
        status: "success",
        employee
    })
})

const getAllEmployees = errorHandler(async(req, res) => {
    let query = search(Employee, req.query)
    query = sort(query, req.query.sort)
    const total = await Employee.countDocuments()
    const page = req.query.page
    const limit = req.query.limit
    const employees = await pagination(query, page, limit, total)

    return res.status(200).send({
        page,
        total,
        status: "success",
        employees
    })
})

const getCurrentEmployee = errorHandler(async(req, res) => {
    const userId = req.user._id
    const employee = await Employee.findOne({userId}).exec()
    if(!employee){
        return res.status(404).send({
            status: "error",
            message: "Employee not found."
        })
    }
    return res.status(200).send({
        status: "success",
        employee
    })
})

// for employees to update their personal profile
const updateCurrentEmployee = errorHandler(async(req, res) => {
    const allowedUpdates = ['name', 'image', 'phoneNumber', 'birthDate', 'bio']
    const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key))
    const updateData = {}
    updates.forEach(update => updateData[update] = req.body[update])
    const employee = await Employee.findOneAndUpdate(
        { userId: req.user._id },
        { $set: updateData },
        { new: true, runValidators: true }
    )
    if(!employee){
        return res.status(404).send({
            status: "error",
            message: "Employee not found."
        })
    }
    return res.status(200).send({
        status: "success",
        employee
    })
})

// for hr to update employee profile
const updateEmployeeById = errorHandler(async(req, res) => {
    const employee = await Employee.findByIdAndUpdate(
        req.params.employee_id,
        {
            name: req.body.employeeName,
            Department: {
                Role: {
                    position: req.body.position,
                    location: req.body.location,
                    startDate: req.body.startDate
                },
                Team: {
                    name: req.body.teamName,
                    role: req.body.role
                }
            },
            WorkSchedule: req.body.workSchedule
        },
        {new: true, runValidators: true}
    )
    if(!employee){
        return res.status(404).send({
            status: "error",
            message: "Employee not found."
        })
    }
    return res.status(200).send({
        status: "success",
        employee
    })
})

const deleteEmployeeById = errorHandler(async(req, res) => {
    const employeeId = req.params.employee_id
    const employee = await Employee.findById(employeeId).exec()
    if(!employee){
        return res.status(404).send({
            status: "error",
            message: "Employee not found."
        })
    }

    const deletingUser = await User.findById(employee.userId).exec()
    const roles = ['employee', 'hr', 'admin']
    const currentRole = roles.findIndex(req.user.role)
    const deletingRole = roles.findIndex(deletingUser.role)
    console.log("current role: ", currentRole)
    console.log("deleting role: ", deletingRole)

    if(currentRole < deletingRole || currentRole == 0){
        return res.status(403).send({
            status: "error",
            message: "Forbidden. You do not have access to this resource."
        })
    }else if(currentRole == 1){
        return res.status(403).send({
            status: "error",
            message: "Forbidden. Only Admins can delete HR accounts."
        })
    }

    await Employee.findByIdAndDelete(employee.id).exec()
    await User.findByIdAndDelete(deletingUser.id).exec()
    return res.status(200).send({
        status: "success",
        message: `${employee.name}'s profile deleted successfully`
    })
})

// others
const bookALeave = errorHandler(async(req, res) => {})
const approveLeave = errorHandler(async(req, res) => {})
const rejectLeave = errorHandler(async(req, res) => {})

export default {
    createEmployee, getEmployeeById, getAllEmployees, getCurrentEmployee,
    updateCurrentEmployee, updateEmployeeById, deleteEmployeeById,
    bookALeave, approveLeave, rejectLeave
}