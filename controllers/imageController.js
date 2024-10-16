import errorHandler from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";

const uploadImage = errorHandler((req, res) => {
    if(!req.file){
        return res.status(400).send({
            status: "error",
            message: "Please upload an image"
        })
    }
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if(err){
            return res.status(500).send({
                status: "error",
                message: "There was an error uploading image, please try again"
            })
        }
        return res.status(200).send({
            status: "success",
            message: "Image saved successfully",
            url: result.url
        })
    })
})

export default uploadImage