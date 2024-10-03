const express = require("express")
const jwt = require("jsonwebtoken")
const Employee = require("../model/Employee")

const auth = async (req, res, next) => {
    if(!req.header("Authorization")){
        return res.status(401).send({
            "status": "error",
            "message": "Unauthorized. Please log in to continue."
        })
    }
    const token = req.header("Authorization").replace("Bearer ", "")
    const data = jwt.verify(token, process.env.JWT_KEY)
    try{
        const user = await Employee.find({_id: data._id}).exec()
        if(!user){
            res.status(401).send({
                "status": "error",
                "message": "Unauthorized. Please log in to continue."
            })
        }
        req.user = user
        req.token = token
        next()
    }catch(error){
        res.status(401).send({
            "status": "error",
            "message": "Unauthorized. Please log in to continue."
        })
    }
}

module.exports = auth