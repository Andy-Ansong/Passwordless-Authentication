const pagination = (modelQuery, page = 1, limit = 20, total) => {
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (isNaN(page) || page < 1) {
        throw new Error("Page number must be a positive integer.")
    }
    if (isNaN(limit) || limit < 1) {
        throw new Error("Limit must be a positive integer.")
    }
    const startIndex = (page - 1) * limit
    if (startIndex >= total) {
        throw new Error("Start index exceeds total items.")
    }
    return modelQuery.skip(startIndex).limit(limit)
}

export default pagination
