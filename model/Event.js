import { Schema, model } from 'mongoose'

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a name for the event."],
        trim: true,
    },
    start: {
        type: Date,
        required: [true, "Please enter the start date and time for the event"],
    },
    end: {
        type: Date,
        required: [true, "Please enter the end date and time for the event"],
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
