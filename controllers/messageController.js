const sendMessages = asyncErrorHandler(async(req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Message sent successfully."
    })
})

module.exports = {sendMessages}