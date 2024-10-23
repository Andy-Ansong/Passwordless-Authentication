import * as jwt from "jsonwebtoken"
import User from "../model/User"

const { verify } = jwt

const auth = () => {
    return async (req, res, next) => {
        try{
            const accessToken = req.header("Authorization").replace("Bearer ", "")
            if(!accessToken){
                return res.status(401).send({
                    status: "error",
                    message: "Unauthorized. Please log in to continue."
                })
            }
            const data = verify(accessToken, process.env.JWT_KEY) as {_id: string}
            let user = await User.findById(data._id).exec()
            if(!user){
                const refreshToken = req.cookies.refreshToken
                if(!refreshToken){
                    return res.status(401).send({
                        status: "error",
                        message: "Unauthorized. Please log in to continue."
                    })
                }
                try{
                    const refreshData = verify(refreshToken, process.env.JWT_KEY) as {_id: string}
                    user = await User.findById(refreshData._id).exec()
                }catch(err){
                    return res.status(401).send({
                        status: "error",
                        message: "Unauthorized. Please log in to continue."
                    })
                }
                if(!user){
                    return res.status(401).send({
                        status: "error",
                        message: "Unauthorized. Please log in to continue."
                    })
                }
                req.refreshToken = await user.generateRefreshToken()
                req.accessToken = await user.generateAccessToken()
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    // secure: process.env.NODE_ENV === 'production',
                    // sameSite: 'Strict',
                    maxAge: 24 * 60 * 60 * 1000
                })
            }else{
                req.accessToken = accessToken
            }
            req.user = user
            next()
        }catch(error){
            return res.status(401).send({
                status: "error",
                message: "Unauthorized. Please log in to continue."
            })
        }
    }
}

export default auth()