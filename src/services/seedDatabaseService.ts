import UserSeeder from "../seeders/seedUsers"
import EventSeeder from "../seeders/seedEvents"
import EmployeeSeeder from "../seeders/seedEmployees"

const seedersList = [
    UserSeeder, EventSeeder, EmployeeSeeder
]

const seedDatabaseService = seedersList.forEach(seeder => {
    seeder.run()
})

export default seedDatabaseService