const sort = (modelQuery, sortQuery) => {
    let sortBy = 'name'
    if(sortQuery){
        sortBy = sortQuery.split(',').join(' ')
    }
    return modelQuery.sort(sortBy)
}

module.exports = sort