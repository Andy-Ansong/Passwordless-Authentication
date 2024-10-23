import mongoose, { Model } from "mongoose"
import { Seeder } from "mongoose-data-seed"

interface ICustomSeeder{
    shouldRun: () => Promise<boolean>
    run: () => Promise<void>
    Model: mongoose.Model<any>
    data: any
}

class CustomSeeder extends Seeder implements ICustomSeeder{
    Model: mongoose.Model<any>
    data: any
    constructor(Model:mongoose.Model<any>, data:any){
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