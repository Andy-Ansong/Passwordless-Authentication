import errorHandler from "../utils/errorHandler.js"
import pagination from '../utils/pagination.js'
import search from '../utils/searchModel.js'
import sort from '../utils/sortModel.js'
import Event from '../model/Event.js'
import User from '../model/User.js'

const createEvent = async(req, res) => {
    // if(req.user.role == "employee"){
    //     req.body.eventType = "Private"
    // }
    const user = {email: "andy@gmail.com", _id: "671541521bc9fe23dc8a3d79"}
    req.body.createdBy = {
        email : user.email,
        userId : user._id
    }
    // const user = await User.findById(req.user._id).exec()
    if(req.body.receivers){
        const receiverEmails = req.body.receivers
        const users = await User.find({email: {$in: receiverEmails}})
        req.body.receivers = users.map(user => user.email)
    }
    
    const { start, end } = req.body;
    if(new Date(start) < new Date()){
        return res.status(400).send({
            status: "error",
            message: "Start date cannot be in the past"
        })
    }
    if(new Date(end) <= new Date(start)){
        return res.status(400).send({
            status: "error",
            message: "End date must be after the start date"
        })
    }
    
    const event = new Event(req.body)
    await event.save()
    res.status(201).send({
        status: "success",
        event,
        message: "Event has been created successfully"
    })
}

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


// const updateEvent = errorHandler(async(req, res) => {
    const updateEvent = async(req, res) => {
    const { title, description, eventType, start, end } = req.body;
    if(req.body.receivers){
        const receiverEmails = req.body.receivers
        const users = await User.find({email: {$in: receiverEmails}})
        req.body.receivers = users.map(user => user._id)
    }
    const event = await Event.findByIdAndUpdate(req.params.id, {
        title,
        description,
        eventType,
        start,
        end,
        receivers: req.body.receivers ?? []
    }, { new: true, runValidators: true })
    
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
}

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
