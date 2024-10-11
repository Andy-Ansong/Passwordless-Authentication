const Employee = require("../model/Employee")
const User = require("../model/User")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const pagination = require('../utils/pagination')
const search = require('../utils/searchModel')
const sort = require('../utils/sortModel')

exports = createEmployee = asyncErrorHandler(async(req, res) => {
    const employee = await Employee.findOne({email: req.body.email}).exec()
    if(employee){
        return res.status(409).send({
            status: "error",
            message: `${new_employee.name}'s profile already exists.`
        })
    }
    const user = new User({email: new_employee.email})
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

exports = getEmployeeById = asyncErrorHandler(async(req, res) => {
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

exports = getAllEmployees = asyncErrorHandler(async(req, res) => {
    let query = search(Employee, req.query)
    query = sort(query, req.query.sort)
    query = pagination(query, req.query.page, req.query.limit, startIndex, Employee.countDocuments())
    const employees = await query

    return res.status(200).send({
        status: "success",
        employees
    })
})

exports = getCurrentEmployee = asyncErrorHandler(async(req, res) => {
    const userId = req.user._id
    const employee = await Employee.findById(userId).exec()
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
exports = updateCurrentEmployee = asyncErrorHandler(async(req, res) => {
    const employee = await Employee.findOneAndUpdate(
        {userId: req.user._id},
        {
            name: req.body.name,
            image: req.body.image,
            phoneNumber: req.body.phoneNumber,
            birthDate: req.body.birthDate,
            bio: req.body.bio
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

// for hr to update employee profile
exports = updateEmployeeById = asyncErrorHandler(async(req, res) => {
    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
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

exports = deleteEmployeeById = asyncErrorHandler(async(req, res) => {
    const employeeId = req.user._id
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
exports = bookALeave = asyncErrorHandler(async(req, res) => {})

exports = approveLeave = asyncErrorHandler(async(req, res) => {})

exports = rejectLeave = asyncErrorHandler(async(req, res) => {})

exports = sendMessages = asyncErrorHandler(async(req, res) => {})
