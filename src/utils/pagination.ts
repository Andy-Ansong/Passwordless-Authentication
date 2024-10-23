import { Query } from "mongoose"

const pagination = (modelQuery: Query, page:number = 1, limit:number = 20, total: number) => {
    page = parseInt(`${page}`, 10) || 1
    limit = parseInt(`${limit}`, 10) || 20
    const startIndex = (page - 1) * limit
    if(total != 0 && startIndex >= total){
        throw new Error("Start index exceeds total items.")
    }
    return modelQuery.skip(startIndex).limit(limit)
}

export default pagination
