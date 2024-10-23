import User from "../model/User"
import CustomError from "../utils/customError"
import search from "../utils/searchModel"
import pagination from "../utils/pagination"
import sort from "../utils/sortModel"
import errorHandler from "../utils/errorHandler"

const createUser = errorHandler(async(req, res, next) => {
    let { email, name, role } = req.body
    if(!email){
        const error = new CustomError("Please enter your email address", 400)
        return next(error)
    }
    const user = await User.findOne({email}).exec()
    if(user){
        return res.status(409).send({status: "error", message: "User already exists"})
    }
    if(!name){
        const error = new CustomError("Please enter your name", 400)
        return next(error)
    }
    let roles: Array<string> = ['employee', 'hr']
    if(req.user.role == 'admin'){
        roles.push('admin')
    }
    if(!roles.includes(role)){
        role = 'employee'
    }
    const new_user = new User({name, email, role})
    await new_user.save()

    return res.status(200).send({
        status: "success",
        message: `${name}'s account has been created successfully.`
    })
})

const getAllUsers = errorHandler(async (req, res) => {
    const searchQuery = req.query.name
    let query = User.find({})
    if(searchQuery)
        query = search(User, {name:searchQuery})
    query = sort(query, req.query.sort)
    const total = await User.countDocuments()
    const page = req.query.page
    const limit = req.query.limit
    const users = await pagination(query, page, limit, total)

    return res.status(200).send({page, total, status: "success", users})
})

const getCurrentUser = errorHandler(async (req, res, next) => {
    const user = req.user
    if(!user){
        const error = new CustomError("User not found", 404)
        return next(error)
    }
    return res.status(200).send({
        status: "success",
        user
    })
})

const deleteCurrentUser = errorHandler(async(req, res, next) => {
    const userId = req.user._id
    const deletedUser = await User.findOneAndDelete({_id: userId})
    if(!deletedUser){
        const error = new CustomError("User not found", 404)
        return next(error)
    }
    return res.status(200).send({message: "User deleted successfully"})
})

export default {
    createUser, getAllUsers, getCurrentUser, deleteCurrentUser
}