import { sendMail } from '../../../lib/mailer';

export async function POST(req) {
    try {
        const { email, subject, message } = await req.json();

        if (!subject || !email || !message) {
            return Response.error({ error: 'Missing required fields' });
        }
        await sendMail({ from: process.env.SMTP_USER, to: process.env.SMTP_USER, subject: subject, text: email + ": " + message })
        return Response.json({ success: true, message: 'Email sent!' });
    } catch (err) {
        console.error('Failed to send email:', err);
        return Response.error();
    }
}