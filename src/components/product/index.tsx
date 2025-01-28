import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise: Promise<Stripe | null> = loadStripe(
    process.env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY as string
);

interface ProductPageProps {
    priceId: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ priceId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        const stripe = await stripePromise;

        if (!stripe) {
            console.error('Stripe.js failed to load.');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('Failed to create Stripe checkout session');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Buy Now'}
        </button>
    );
};

export default ProductPage;