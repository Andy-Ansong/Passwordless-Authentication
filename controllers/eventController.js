import errorHandler from "../utils/errorHandler.js"
import pagination from '../utils/pagination.js'
import search from '../utils/searchModel.js'
import sort from '../utils/sortModel.js'
import Event from '../model/Event.js'
import User from '../model/User.js'

const createEvent = async(req, res) => {
    console.log(req.user)
    if(req.user.role == "employee"){
        req.body.eventType = "Private"
    }
    console.log(req.body.eventType)
    const user = await User.findById(req.user._id).exec()
    req.body.createdBy = {
        email : user.email,
        userId : user._id
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
    console.log("added event")
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
    query = query.populate('receivers', 'email _id')
    let events = await pagination(query, page, limit, total)
    events = events.filter(event => {
        console.log(event.eventType)
        if(event.eventType == "Private"){
            if(event.createdBy.userId == req.user._id){
                return event
            }
            else if(event.receivers.includes(req.user._id)){
                return event
            }
        }else{
            return event
        }
    })
    res.status(200).send({
        page,
        total,
        status: "success",
        events
    })
})

const updateEvent = errorHandler(async(req, res) => {
    const { title, description, eventType, start, end } = req.body;
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
    createEvent, getAllEvents, updateEvent, deleteEvent
}
