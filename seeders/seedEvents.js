import {publicHolidays} from "./data/eventData.js"
import CustomSeeder from "../utils/customSeeder.js"
import Event from "../model/Event.js"

const EventSeeder = new CustomSeeder(Event, publicHolidays)

export default EventSeeder