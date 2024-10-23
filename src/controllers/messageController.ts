import errorHandler from "../utils/errorHandler"

const sendMessages = errorHandler(async(req: any, res: any) => {
    return res.status(200).send({
        status: "success",
        message: "Message sent successfully."
    })
})

export default sendMessages