const sendMessages = errorHandler(async(req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Message sent successfully."
    })
})

export default {sendMessages}