import User from "../model/User.js"
import search from "../utils/searchModel.js"
import pagination from "../utils/pagination.js"
import sort from "../utils/sortModel.js"
import errorHandler from "../utils/errorHandler.js"

const getAllUsers = errorHandler(async (req, res) => {
    const searchQuery = req.query.name
    let query = User.find({})
    if(searchQuery)
        query = search(User, {name:{ $regex: searchQuery, $options: 'i' }})
    query = sort(query, req.query.sort)
    const total = await User.countDocuments()
    const page = req.query.page
    const limit = req.query.limit
    const users = await pagination(query, page, limit, total)

    return res.status(200).send({page, total, status: "success", users})
})

export default {
    getAllUsers
}