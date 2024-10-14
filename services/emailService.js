import transporter from "../utils/emailUtil.js"

const sendOtpEmailService = async (receiverEmail, otp) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: [receiverEmail],
        replyTo: process.env.REPLY_TO,
        subject: "Passwordless Authentication",
        text: `This is your one-time code:\n${otp}\nCode expires in 5 minutes.`,
        html: `
            <div>
                <p>This is your one-time code:</p>
                <h2 style="color: #f56607">${otp}</h2>
                <p>Please copy and paste to login into you account</p>
                <p>The code expires in 5 minutes.</p>
                <br />
                <p>Thank you</p>
            </div>
        `
    }
    await transporter.sendMail(mailOptions)
}

export default sendOtpEmailService