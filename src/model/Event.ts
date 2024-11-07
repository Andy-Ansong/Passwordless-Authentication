import { Schema, model, Document } from 'mongoose';

// Define interfaces
interface ICreatedBy {
  userId: Schema.Types.ObjectId;
  email: string;
}

export interface IEvent extends Document {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  createdBy: ICreatedBy;
  eventType: 'Public' | 'Private' | 'Holiday';
  receivers: Schema.Types.ObjectId[];
}

// Define the schema
const eventSchema = new Schema<IEvent>({
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
    trim: true,
  },
  createdBy: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  eventType: {
    type: String,
    enum: ['Public', 'Private', 'Holiday'],
    default: 'Private',
  },
  receivers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

// Create and export the model
const Event = model<IEvent>('Event', eventSchema);

export default Event;
