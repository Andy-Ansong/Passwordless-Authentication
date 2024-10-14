import UserSeeder from "../seeders/seedUsers.js"
import ProfileSeeder from "../seeders/seedProfiles.js"

const seedersList = [
    UserSeeder, ProfileSeeder
]

const seedDatabaseService = seedersList.forEach(seeder => {
    seeder.run()
})

export default seedDatabaseService