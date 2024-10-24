import { Schema, model } from 'mongoose'

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a name for the event."],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, "Please enter the date for the event"],
    },
    time:{
        type: String,
        required: [true, "Please enter the time for the event"]
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    eventType: {
        type: String,
        enum: ['Public', 'Private', 'Holiday'],
        default: 'Private'
    },
    receivers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
})

const Event = model('Event', eventSchema)

export default Event
