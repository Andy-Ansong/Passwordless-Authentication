const pagination = (modelQuery, page = 1, limit = 20, total) => {
    page = parseInt(page, 10) || 1
    limit = parseInt(limit, 10) || 20
    const startIndex = (page - 1) * limit
    if(total != 0 && startIndex >= total){
        throw new Error("Start index exceeds total items.")
    }
    return modelQuery.skip(startIndex).limit(limit)
}

export default pagination
