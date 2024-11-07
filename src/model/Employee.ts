import mongoose, { Schema, model, Document } from "mongoose";

// Define interfaces
interface IRole {
  position: string;
  location: string;
  startDate: Date;
}

interface ITeam {
  name: string;
  role: string;
  isLeader: boolean;
}

interface IDepartment {
  Role: IRole;
  Team: ITeam;
}

interface IWorkSchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  type: 'On-site' | 'Remote';
}

export interface IEmployee extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  gender: 'Male' | 'Female';
  isActive: boolean;
  image?: string;
  email?: string;
  bio?: string;
  birthDate: Date;
  phoneNumber: string;
  skills: string[];
  Department: IDepartment;
  WorkSchedule: IWorkSchedule[];
}

// Define the schema
const employeeSchema = new Schema<IEmployee>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    validate: {
      validator: (value: string) => /^[a-zA-Z\s]+$/.test(value),
      message: "Name should only contain alphabets and spaces.",
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: [true, "Please enter your gender (Male/Female)"],
    validate: (value: string) => {
      if (!["Male", "Female"].includes(value)) {
        return new Error("Gender can be either Male or Female");
      }
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
  },
  bio: {
    type: String,
  },
  birthDate: {
    type: Date,
    required: [true, "Please enter your date of birth"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"],
  },
  skills: {
    type: [String],
  },
  Department: {
    Role: {
      position: {
        type: String,
        default: "Not assigned",
      },
      location: {
        type: String,
        default: "Not assigned",
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
    },
    Team: {
      name: {
        type: String,
        default: "Not assigned",
      },
      role: {
        type: String,
        default: "Not assigned",
      },
      isLeader: {
        type: Boolean,
        default: false,
      },
    },
  },
  WorkSchedule: {
    type: [
      {
        day: {
          type: String,
          enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          required: true,
        },
        type: {
          type: String,
          enum: ["On-site", "Remote"],
          required: true,
        },
      },
    ],
    default: [
      { day: "Monday", type: "On-site" },
      { day: "Tuesday", type: "On-site" },
      { day: "Wednesday", type: "On-site" },
      { day: "Thursday", type: "On-site" },
      { day: "Friday", type: "Remote" },
    ],
  },
});

// Create and export the model
const Employee = model<IEmployee>("Employee", employeeSchema);

export default Employee;
