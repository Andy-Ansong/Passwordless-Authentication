export const prodErrors = (res, error) => {
    if(error.isOperational){
        res.status(error.statusCode).send({
            status: error.statusCode,
            message: error.message,
        })
    }else{
        res.status(500).send({
            status: "Error",
            message: "Something went wrong, please try again.",
        })
    }
}