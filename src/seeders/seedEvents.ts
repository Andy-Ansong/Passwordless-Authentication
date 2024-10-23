import {publicHolidays} from "./data/eventData"
import CustomSeeder from "../utils/customSeeder"
import Event from "../model/Event"

const EventSeeder = new CustomSeeder(Event, publicHolidays)

export default EventSeeder