export const prodErrors = (res, error) => {
    if(error.isOperational){
        return res.status(error.statusCode).send({
            status: error.statusCode,
            message: error.message,
        })
    }else{
        return res.status(500).send({
            status: "Error",
            message: "Something went wrong, please try again.",
        })
    }
}