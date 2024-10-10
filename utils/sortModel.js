const sort = (modelQuery, sortBy) => {
    const sortBy = modelQuery.split(',').join(' ')
    return model.sort(sortBy)
}

module.exports = sort