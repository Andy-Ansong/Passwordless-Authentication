import Profile from "../model/Profile.js"
import CustomSeeder from "../utils/customSeeder.js"
import {profiles} from "./data/profileData.js"

const ProfileSeeder = new CustomSeeder(Profile, profiles)

export default ProfileSeeder