import jwt from "jsonwebtoken"
import User from "../model/User.js"

const { verify } = jwt

const auth = () => {
    return async (req, res, next) => {
        try{
            const token = req.header("Authorization").replace("Bearer ", "")
            const data = verify(token, process.env.JWT_KEY)
            const user = await User.findById(data._id).exec()
            if(!user){
                return res.status(401).send({
                    "status": "error",
                    "message": "Unauthorized. Please log in to continue."
                })
            }

            req.user = user
            req.token = token
            next()
        }catch(error){
            return res.status(401).send({
                "status": "error",
                "message": "Unauthorized. Please log in to continue."
            })
        }
    }
}

export default auth()