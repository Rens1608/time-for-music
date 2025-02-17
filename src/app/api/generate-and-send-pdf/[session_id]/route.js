import puppeteer from 'puppeteer';
import Stripe from "stripe";
import { sendMail } from '../../../../lib/mailer';

const stripe = new Stripe(process.env.DEV_STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(req, { params }) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: null
    });
  }

  try {
    const { session_id } = await params;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const playlistId = session.metadata?.order_number;
    const email = session.customer_details?.email || session.customer_email;

    if (!playlistId || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing playlistId or email.' }),
        { status: 400 }
      );
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-playlist?playlistId=${playlistId}`, {
      cache: 'no-cache',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch playlist');
    }
    const response = await res.json();
    const playlistData = response.playlistData

    if (playlistData.isDelivered == false) {

      const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pdf/${playlistId}`;

      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto(pdfUrl, { waitUntil: "networkidle0" })
      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
      await browser.close();

      await sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Your Time for music Playlist',
        text: 'Thank you for your purchase. Please find your PDF attached.',
        attachments: [
          {
            filename: 'time-for-music.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      })

      playlistData.isDelivered = true;

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/update-playlist`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playlistId: playlistId, playlistData: playlistData }),
      })
    }
    return Response.json({
      session_id: session_id,
      email: email
    })
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}