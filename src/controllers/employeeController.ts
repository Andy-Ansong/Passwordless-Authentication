import Employee from "../model/Employee"
import User from "../model/User"
import errorHandler from "../utils/errorHandler"
import pagination from '../utils/pagination'
import search from '../utils/searchModel'
import sort from '../utils/sortModel'

const createEmployee = errorHandler(async(req, res) => {
    let user = await User.findOne({email: req.body.email}).exec()
    if(!req.body.email){
        return res.status(400).send({
            status: "error",
            message: "Please enter email address"
        })
    }
    if(!user){
        try{
            user = new User({
                email: req.body.email,
                name: req.body.name,
                role: req.user.role || "employee"
            })
            await user.save()
        }catch(err){
            return res.status(400).send({
                status: "error",
                err,
                message: "There was an error saving the data, please try again"
            })
        }
    }
    const employee = await Employee.findOne({email: user.email}).exec()
    if(employee){
        return res.status(409).send({
            status: "error",
            message: `${req.body.name}'s profile already exists.`
        })
    }
    const image = req.body.gender.toLowerCase() == "male"
    ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwwjGPKEe7tevCCZHFzbzIopd-Ar4nyIfjVQ&s`
    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTB-jxWCPZVYhac_ggXn6WtXv1_L5DSU9svQ&s`
    try{
        const new_employee = new Employee({
            ...req.body,
            userId: user._id,
            image: image
        })
        new_employee.save()
        return res.status(201).send({
            status: "success",
            message: `${new_employee.name}'s profile created successfully.`,
        })
    }catch(err){
        return res.status(400).send({
            status: "error",
            err,
            message: "There was an error saving the data, please try again"
        })
    }
})

const getEmployeeById = errorHandler(async(req, res) => {
    const employeeId = req.params.id
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
    const searchQuery = req.query.name
    let query = Employee.find({})
    if(searchQuery)
        query = search(Employee, {name:searchQuery})
    query = sort(query, req.query.sort)
    const total = await Employee.countDocuments()
    const page = req.query.page
    const limit = req.query.limit
    const employees = await pagination(query, page, limit, total)

    return res.status(200).send({
        page,
        total,
        user: req.user,
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
    const allowedUpdates = ['name', 'image', 'phoneNumber', 'bio']
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
        req.params.id,
        {
            name: req.body.name,
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
    const employeeId = req.params.id
    const employee = await Employee.findById(employeeId).exec()
    if(!employee){
        return res.status(404).send({
            status: "error",
            message: "Employee not found."
        })
    }

    const deletingUser = await User.findById(employee.userId).exec()
    const roles = ['employee', 'hr', 'admin']
    const currentRole = roles.findIndex(role => role == req.user.role)
    const deletingRole = roles.findIndex(role => role == deletingUser.role)

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