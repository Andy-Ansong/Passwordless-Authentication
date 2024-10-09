module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || "There was an error connecting to server"
    res.status(error.statusCode).send({
        status: error.statusCode,
        message: error.message
    })
}