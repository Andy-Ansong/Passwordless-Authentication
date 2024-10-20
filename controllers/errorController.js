import CustomError from "../utils/customError.js"
import {devErrors} from "../utils/devErrors.js"
import {prodErrors} from "../utils/prodErrors.js"

const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}`
    return new CustomError(msg, 400)
}

const duplicateKeyErrorHandler = (err) => {
    const name = err.keyValue.name
    const msg = `There is already a user with email ${name}`
    return new CustomError(msg, 409)
}

export default (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || "There was an error connecting to server"

    if(process.env.NODE_ENV === 'development'){
        return devErrors(res, error)
    }else if(process.env.NODE_ENV === 'production'){
        if(error.name === 'CastError')
            error = castErrorHandler(error)
        if(error.code === 11000)
            error => duplicateKeyErrorHandler(error)
        return prodErrors(res, error)
    }
}