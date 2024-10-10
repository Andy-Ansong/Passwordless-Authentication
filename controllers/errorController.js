const CustomError = require("../utils/customError")
const devErrors = require("../utils/devErrors")
const prodErrors = require("../utils/prodErrors")

const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}`
    return new CustomError(msg, 400)
}

const duplicateKeyErrorHandler = (err) => {
    const name = err.keyValue.name
    const msg = `There is already a movie with name ${name}. Please use another name!`
    return new CustomError(msg, 409)
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || "There was an error connecting to server"

    if(process.env.NODE_ENV === 'development'){
        devErrors(res, error)
    }else if(process.env.NODE_ENV === 'production'){
        if(error.name === 'CastError')
            error = castErrorHandler(error)
        if(error.code === 11000)
            error => duplicateKeyErrorHandler(error)
        prodErrors(res, err)
    }
}