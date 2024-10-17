import errorHandler from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";
import Employee from "../model/Employee.js";
import axios from 'axios';

export const uploadImage = errorHandler(async (req, res) => {
    if(!req.file){
        return res.status(400).send({
            status: "error",
            message: "Please upload an image"
        })
    }
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if(err){
            return res.status(500).send({
                status: "error",
                message: "There was an error uploading image, please try again"
            })
        }
        await Employee.findOneAndUpdate({userId: req.user._id}, {image: result.url}).exec()
        return res.status(200).send({
            status: "success",
            message: "Image saved successfully",
            url: result.url
        })
    })
})

export const fetchImage = errorHandler(async (req, res) => {
    const user = req.user
    const employee = await Employee.findOne({userId: user._id}).exec()
    return res.status(200).json({
        status: "success",
        image: employee.image
    })
})
