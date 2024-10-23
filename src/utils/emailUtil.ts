import { createTransport } from "nodemailer"
import SMTPPool from "nodemailer/lib/smtp-pool"

interface ITransporter extends SMTPPool.Options{
    host: string
    port: number
    secure: boolean,
    auth: {
        user: string
        pass: string
    }
}

const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 3000,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
} as ITransporter)

export default transporter