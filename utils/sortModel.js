const sort = (modelQuery, sortQuery) => {
    let sortBy = 'name'
    if(sortQuery){
        sortBy = modelQuery.split(',').join(' ')
    }
    return model.sort(sortBy)
}

module.exports = sort