import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.DEV_STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use the latest version
});

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: null
    });
  }
  try {
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const productName = "Test Product";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Playlist (Max 500)' },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://time-for-music.vercel.app/orderSuccess?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://time-for-music.vercel.app/createPlaylist',
      metadata: {
        order_number: orderNumber,
        product_name: productName,
      },
      customer_email: req.body.email || undefined,
    });

    return NextResponse.redirect(session.url, 303);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}