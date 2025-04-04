import puppeteer from 'puppeteer';
import Stripe from "stripe";
import { sendMail } from '../../../../lib/mailer';
import { PDFDocument } from 'pdf-lib';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
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
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const totalPages = pdfDoc.getPageCount();

      if (totalPages > 24) {
        const { part1, part2 } = await splitPDF(pdfBuffer, totalPages);

        await sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Your Time for music Playlist - Part 1',
          text: 'Thank you for your purchase. Please find Part 1 of your PDF attached. The second part is in a seperate email.',
          attachments: [
            {
              filename: 'time-for-music-part-1.pdf',
              content: part1,
              contentType: 'application/pdf',
            },
          ],
        })

        await sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Your Time for music Playlist - Part 2',
          text: 'Thank you for your purchase. Please find part 2 of your PDF attached.',
          attachments: [
            {
              filename: 'time-for-music-part-2.pdf',
              content: part2,
              contentType: 'application/pdf',
            },
          ],
        })

      } else {
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
      }

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

async function splitPDF(pdfBuffer, totalPages) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  let splitPoint = Math.ceil(totalPages / 2);
  if (splitPoint % 2 !== 0) {
    splitPoint += 1;
  }

  const firstHalfDoc = await PDFDocument.create();
  const secondHalfDoc = await PDFDocument.create();

  const firstPages = await firstHalfDoc.copyPages(pdfDoc, [...Array(splitPoint).keys()]);
  firstPages.forEach((page) => firstHalfDoc.addPage(page));

  const secondPages = await secondHalfDoc.copyPages(pdfDoc, [...Array(totalPages).keys()].slice(splitPoint));
  secondPages.forEach((page) => secondHalfDoc.addPage(page));

  const part1 = await firstHalfDoc.save();
  const part2 = await secondHalfDoc.save();

  return { part1: Buffer.from(part1), part2: Buffer.from(part2) };
}