const jwt = require("jsonwebtoken")
const User = require("../model/User")

const auth = () => {
    return async (req, res, next) => {
        try{
            const token = req.header("Authorization").replace("Bearer ", "")
            const data = jwt.verify(token, process.env.JWT_KEY)
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

module.exports = auth()