import { createTransport, Transporter } from 'nodemailer';

// Ensure you have environment variables for the SMTP configuration
const transporter: Transporter = createTransport({
    service: "gmail",
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),  // Ensure the port is a number
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export default transporter;
