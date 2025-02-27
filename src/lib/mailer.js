// lib/mailer.js
import nodemailer from 'nodemailer';

let transporter;

function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT_SSL),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    return transporter;
}

export async function sendMail({ from, to, subject, text, attachments = [] }) {
    const mailOptions = {
        from,
        to,
        subject,
        text,
        attachments
    };

    try {
        const transport = getTransporter();
        await transport.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
