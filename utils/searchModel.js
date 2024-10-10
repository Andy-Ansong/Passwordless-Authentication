const search = (Model, query) => {
    return Model.find(query)
}

module.exports = search