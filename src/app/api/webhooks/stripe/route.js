// pages/api/webhooks/stripe.js
import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.DEV_STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const productId = session.metadata.productId;

        console.log('Product ID from checkout session:', productId);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
}