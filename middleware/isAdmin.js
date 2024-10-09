const isAdmin = () => {
    return async (req, res, next) => {
        try{
            if(req.user.isAdmin){
                next()
            }
            return res.status(403).send({
                status: "error",
                message: "Forbidden. You do not have access to this resource."
            })
        }catch(error){
            return res.status(403).send({
                status: "error",
                message: "Forbidden. You do not have access to this resource."
            })
        }
    }
}

module.exports = isAdmin()