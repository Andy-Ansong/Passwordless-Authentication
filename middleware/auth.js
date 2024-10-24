import jwt from 'jsonwebtoken'
import User from '../model/User.js'

const auth = async (req, res, next) => {
    try {
        const accessToken = req.header("Authorization").replace("Bearer ", "")
        if (!accessToken) {
            return res.status(401).send({
                status: "error",
                message: "Unauthorized. Please log in to continue."
            })
        }
        let user
        try {
            const data = jwt.verify(accessToken, process.env.JWT_KEY)
            user = await User.findById(data._id).exec()
            if (!user) {
                return res.status(401).send({
                    status: "error",
                    message: "Unauthorized. Please log in to continue."
                })
            }
            req.user = user
            return next()
        } catch (err) {
            if (err.name == "TokenExpiredError") {
                const refreshToken = req.cookies.refreshToken
                if (!refreshToken) {
                    return res.status(401).send({
                        status: "error",
                        message: "Unauthorized. Please log in to continue."
                    })
                }
                try {
                    const refreshData = jwt.verify(refreshToken, process.env.REFRESH_KEY)
                    user = await User.findById(refreshData._id).exec()
                    if (!user) {
                        return res.status(401).send({
                            status: "error",
                            message: "Unauthorized. Please log in to continue."
                        })
                    }
                    const newAccessToken = await user.generateAccessToken()
                    const newRefreshToken = await user.generateRefreshToken()
                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        // secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Lax',
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    req.user = user
                    console.log("user")
                    req.accessToken = newAccessToken
                    next()
                } catch (err) {
                    return res.status(401).send({
                        status: "error",
                        message: "Unauthorized. Please log in to continue."
                    })
                }
            } else {
                return res.status(401).send({
                    status: "error",
                    message: "Unauthorized. Please log in to continue."
                })
            }
        }
    } catch (error) {
        return res.status(401).send({
            status: "error",
            message: "Unauthorized. Please log in to continue."
        })
    }
}

export default auth
