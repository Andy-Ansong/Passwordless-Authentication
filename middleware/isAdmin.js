const isAdmin = () => {
    return async (req, res, next) => {
        try{
            if(!req.user.isAdmin){
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

exports.restrict = (role) => {}

module.exports = isAdmin()