import UserSeeder from "../seeders/seedUsers.js"
import ProfileSeeder from "../seeders/seedProfiles.js"
import EventSeeder from "../seeders/seedEvents.js"

const seedersList = [
    UserSeeder, ProfileSeeder, EventSeeder
]

const seedDatabaseService = seedersList.forEach(seeder => {
    seeder.run()
})

export default seedDatabaseService