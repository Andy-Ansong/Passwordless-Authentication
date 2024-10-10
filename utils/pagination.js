const pagination = (modelQuery, page, limit, startIndex, total) => {
    page = page || 1
    limit = limit || 20
    startIndex = (page - 1) * limit
    if(startIndex >= total){
        return new Error()
    }
    return modelQuery.skip(startIndex).limit(limit)
}

module.exports = pagination