const User = require("../model/User")
const CustomError = require("../utils/customError")
const Profile = require("../model/Profile")
const search = require("../utils/searchModel")
const pagination = require("../utils/pagination")
const sort = require("../utils/sortModel")
const asyncErrorHandler = require("../utils/asyncErrorHandler")

const getAllUsers = asyncErrorHandler(async (req, res) => {
    let query = search(User, req.query)
    query = sort(query, req.query.sort)
    query = pagination(query, req.query.page, req.query.limit, startIndex, User.countDocuments())
    const users = await query
    return res.status(200).send({status: "success", users})
})

const getCurrentUser = asyncErrorHandler(async (req, res, next) => {
    const user = req.user
    if(!user){
        const error = new CustomError(
            "User not found",
            404
        )
        return next(error)
    }
    return res.status(200).send({
        status: "success",
        user
    })
})

const deleteCurrentUser = asyncErrorHandler(async(req, res, next) => {
    const userId = req.user._id
    const deletedUser = await User.findOneAndDelete(userId)
    if(!deletedUser){
        const error = new CustomError(
            "User not found",
            404
        )
        return next(error)
    }
    await Profile.findOneAndDelete({
        userId: userId
    })
    return res.status(200).send({message: "User deleted successfully"})
})

module.exports = {
    getAllUsers, getCurrentUser, deleteCurrentUser
}