interface IError{
    statusCode: number
    status: string
    isOperational?: boolean
}

class CustomError extends Error implements IError {
    statusCode: number
    status: string
    isOperational: boolean

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        this.status = (statusCode >= 400 && statusCode < 500) ? "Fail" : "Error"
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export default CustomError
