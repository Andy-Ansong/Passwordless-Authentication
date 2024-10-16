import UserSeeder from "../seeders/seedUsers.js"
import EventSeeder from "../seeders/seedEvents.js"

const seedersList = [
    UserSeeder, EventSeeder
]

const seedDatabaseService = seedersList.forEach(seeder => {
    seeder.run()
})

export default seedDatabaseService