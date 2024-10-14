const role = (roles = []) => {
    return async (req, res, next) => {
        try{
            if(!roles.includes(req.user.role)){
                return res.status(403).send({
                    status: "error",
                    message: "Forbidden. You do not have access to this resource."
                })
            }
            next()
        }catch(error){
            return res.status(403).send({
                status: "error",
                message: "Forbidden. You do not have access to this resource."
            })
        }
    }
}

module.exports = role
