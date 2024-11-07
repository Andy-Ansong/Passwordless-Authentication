import transporter from "@utils/emailUtil";
import { Transporter } from "nodemailer";

const sendOtpEmailService = async (receiverEmail: string, otp: string): Promise<void> => {
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
                <p>Please copy and paste to login into your account</p>
                <p>The code expires in 5 minutes.</p>
                <br />
                <p>Thank you</p>
            </div>
        `
    };

    // Ensure transporter is a proper nodemailer Transporter instance
    await (transporter as Transporter).sendMail(mailOptions);
}

export default sendOtpEmailService;
