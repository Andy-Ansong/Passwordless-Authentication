const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../model/User")

const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.find({_id: data._id}).exec()
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