require("dotenv").config()
const express = require("express")
const Employee = require("../model/Employee")
const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
    const users = await Employee.find({})
    return res.status(200).send({users})
})

userRouter.post("/signup", async (req, res) => {
    try{
        const employee = new Employee(req.body)
        await employee.save()
        const token = employee.generateAuthToken()
        return res.status(201).send({employee, token})
    }catch(error){
        return res.status(400).send({error})
    }
})

module.exports = userRouter