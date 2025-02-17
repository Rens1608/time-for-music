import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.DEV_STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  try {
    const { playlistId, playlistName } = await req.json()

    const productName = playlistName;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Playlist (Max 200) - ' + playlistName },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: process.env.NEXT_PUBLIC_BASE_URL + '/order-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/create-playlist',
      metadata: {
        order_number: playlistId,
        product_name: productName,
      },
      customer_email: req.body.email || undefined,
    });

    return NextResponse.json({ url: session.url });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}