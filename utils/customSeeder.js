import { Seeder } from "mongoose-data-seed"

class CustomSeeder extends Seeder{
    constructor(Model, data){
        super()
        this.Model = Model
        this.data = data
    }
    async shouldRun(){
        return this.Model.countDocuments()
            .exec()
            .then(count => count === 0)
    }
    async run(){
        if(await this.shouldRun()){
            return this.Model.create(this.data)
        }
    }
}

export default CustomSeeder