export const devErrors = (res, error) => {
    return res.status(error.statusCode).send({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}