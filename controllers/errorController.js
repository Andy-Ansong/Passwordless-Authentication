const CustomError = require("../utils/customError")
const devErrors = require("../utils/devErrors")
const prodErrors = require("../utils/prodErrors")

const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}`
    return new CustomError(msg, 400)
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || "There was an error connecting to server"

    if(process.env.NODE_ENV === 'development'){
        devErrors(res, error)
    }else if(process.env.NODE_ENV === 'production'){
        let err = {...error}
        if(error.name === 'CastError'){
            err = castErrorHandler(err)
        }
        prodErrors(res, err)
    }
}