import errorHandler from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";
import Employee from "../model/Employee.js";

export const uploadImage = errorHandler(async (req, res) => {
    if(!req.files){
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
