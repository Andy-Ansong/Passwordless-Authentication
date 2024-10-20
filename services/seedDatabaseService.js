import UserSeeder from "../seeders/seedUsers.js"
import EventSeeder from "../seeders/seedEvents.js"
import EmployeeSeeder from "../seeders/seedEmployees.js"

const seedersList = [
    UserSeeder, EventSeeder, EmployeeSeeder
]

const seedDatabaseService = seedersList.forEach(seeder => {
    seeder.run()
})

export default seedDatabaseService