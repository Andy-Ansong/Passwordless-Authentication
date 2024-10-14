export const devErrors = (res, error) => {
    res.status(error.statusCode).send({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}