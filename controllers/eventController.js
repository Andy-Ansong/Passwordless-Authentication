import errorHandler from "../utils/errorHandler.js"
import pagination from '../utils/pagination.js'
import search from '../utils/searchModel.js'
import sort from '../utils/sortModel.js'
import Event from '../model/Event.js'

const createEvent = errorHandler(async(req, res) => {
    if(req.user.role == "employee"){
        req.body.isPrivate = true
        req.body.isPublicHoliday = false
    }
    req.body.createdBy = {
        email : req.user.email,
        userId : req.user._id
    }
    const event = new Event(req.body)
    await event.save()
    res.status(201).send({
        status: "success",
        message: "Event has been created successfully"
    })
})

const getAllEvents = errorHandler(async(req, res) => {
    const nameSearch = req.query.name
    let query = Event.find({})
    if(nameSearch)
        query = search(Event, {name: nameSearch})
    query = sort(query, req.query.sort)
    const total = await Event.countDocuments()
    const page = req.query.page
    const limit = req.query.limit
    const events = await pagination(query, page, limit, total)
    res.status(200).send({
        page,
        total,
        status: "success",
        events
    })
})

const getEvent = errorHandler(async(req, res) => {
    const event = await Event.findById(req.params.id)
    if(!event){
        return res.status(404).send({
            status: "error",
            message: "Event not found"
        })
    }
    res.status(200).send({
        status: "success",
        event
    })
})

const updateEvent = errorHandler(async(req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if(!event){
        return res.status(404).send({
            status: "error",
            message: "Event not found"
        })
    }
    res.status(200).send({
        status: "success",
        event
    })
})

const deleteEvent = errorHandler(async(req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id)
    if(!event){
        return res.status(404).send({
            status: "error",
            message: "Event not found"
        })
    }
    res.status(200).send({
        status: "success",
        event
    })
})

export default {
    createEvent, getAllEvents, getEvent, updateEvent, deleteEvent
}
