const {Seeder} = require("mongoose-data-seed")

class CustomSeeder extends Seeder{
    constructor(Model, data){
        super()
        this.Model = Model
        this.data = this.data
    }
    async shouldRun(){
        return this.Model.countDocuments()
            .exec()
            .then(count => count === 0)
    }
    async run(){
        return this.Model.create(this.data)
    }
}

module.exports = CustomSeeder