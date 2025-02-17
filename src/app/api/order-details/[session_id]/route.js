import Stripe from 'stripe';

const stripe = new Stripe(process.env.DEV_STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

export async function GET(req, { params }) {
    if (req.method !== 'GET') {
        return Response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { session_id } = await params;

    if (!session_id || typeof session_id !== 'string') {
        return Response.status(400).json({ error: 'Invalid session_id' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const orderNumber = session.metadata?.order_number || 'Unknown Order';
        const productName = session.metadata?.product_name || 'Unknown Product';
        const customerEmail = session.customer_details?.email || session.customer_email || 'Unknown Email';
        const fullName = session.customer_details?.name || 'Unknown Name';

        return Response.json({ orderNumber, productName, customerEmail, fullName });
    } catch (error) {
        return Response.status(500).json({ error: error.message });
    }
}