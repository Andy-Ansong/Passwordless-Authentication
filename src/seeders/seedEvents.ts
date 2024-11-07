import Event, { IEvent } from '@model/Event'; // Importing Event model and IEvent interface
import { publicHolidays } from '@data/eventData'; // Adjust path as needed
import CustomSeeder from '@utils/customSeeder'; // Adjust path as needed

// Create an instance of CustomSeeder with the Event model and publicHolidays data
const EventSeeder = new CustomSeeder<IEvent>(Event, publicHolidays);

export default EventSeeder;
