import { Schema, model } from 'mongoose'

const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name for the event."],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, "Please enter the date for the event"],
    },
    description: {
        type: String,
        trim: true
    },
    isPublicHoliday: {
        type: Boolean,
        default: false
    },
    createdBy: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    receivers:[{
        type: String,
    }]
})

const Event = model('Event', eventSchema)

export default Event
