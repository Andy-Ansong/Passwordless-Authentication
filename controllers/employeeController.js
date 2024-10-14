const Employee = require("../model/Employee")
const User = require("../model/User")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const pagination = require('../utils/pagination')
const search = require('../utils/searchModel')
const sort = require('../utils/sortModel')

const createEmployee = asyncErrorHandler(async(req, res) => {
    const employee = await Employee.findOne({email: req.body.email}).exec()
    if(employee){
        return res.status(409).send({
            status: "error",
            message: `${req.body.name}'s profile already exists.`
        })
    }
    const user = new User({email: req.body.email})
    await user.save()
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

const getEmployeeById = asyncErrorHandler(async(req, res) => {
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

const getAllEmployees = asyncErrorHandler(async(req, res) => {
    let query = search(Employee, req.query)
    query = sort(query, req.query.sort)
    query = pagination(query, req.query.page, req.query.limit, startIndex, Employee.countDocuments())
    const employees = await query

    return res.status(200).send({
        status: "success",
        employees
    })
})

const getCurrentEmployee = asyncErrorHandler(async(req, res) => {
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
const updateCurrentEmployee = asyncErrorHandler(async(req, res) => {
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
const updateEmployeeById = asyncErrorHandler(async(req, res) => {
    const employee = await Employee.findByIdAndUpdate(
        req.params.employee_id,
        {...req.body},
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

const deleteEmployeeById = asyncErrorHandler(async(req, res) => {
    const employeeId = req.params.employee_id
    const employee = await Employee.findByIdAndDelete(employeeId).exec()
    if(!employee){
        return res.status(404).send({
            status: "error",
            message: "Employee not found."
        })
    }
    return res.status(200).send({
        status: "success",
        message: `${employee.name}'s profile deleted successfully`
    })
})

// others
const bookALeave = asyncErrorHandler(async(req, res) => {})
const approveLeave = asyncErrorHandler(async(req, res) => {})
const rejectLeave = asyncErrorHandler(async(req, res) => {})

module.exports = {
    createEmployee, getEmployeeById, getAllEmployees, getCurrentEmployee,
    updateCurrentEmployee, updateEmployeeById, deleteEmployeeById,
    bookALeave, approveLeave, rejectLeave
}