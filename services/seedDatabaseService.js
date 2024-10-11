const UserSeeder = require("../seeders/seedUsers")
const ProfileSeeder = require("../seeders/seedProfiles")

const seedersList = [
    UserSeeder, ProfileSeeder
]

const seedDatabaseService = seedersList.forEach(seeder => {
    seeder.run()
})

module.exports = seedDatabaseService