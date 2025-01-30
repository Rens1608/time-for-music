'use client'

import Stepper from "@/components/stepper";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function OrderSuccessPage() {
    const searchParams = useSearchParams()
    const session_id = searchParams.get("session_id");
    const [orderDetails, setOrderDetails] = useState<{ orderNumber: string; productName: string; customerEmail: string; fullName: string } | null>(null);

    useEffect(() => {
        if (!session_id) return;

        const fetchSessionDetails = async () => {
            try {
                const res = await fetch(`/api/order-details?session_id=${session_id}`);
                const data = await res.json();
                setOrderDetails(data);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };

        fetchSessionDetails();
    }, [session_id]);

    return (
        <main className="mt-28 flex flex-col items-center">
            <Stepper
                steps={['Playlist', 'Payment', 'Done!']}
                currentStep={3}
            />
            <div className="flex flex-col items-center">
                <h1 className="text-center my-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">Thank you!</h1>
                <p className="text-center mb-4 text-body-color dark:text-dark-6">We will send an e-mail to: <strong>{orderDetails?.customerEmail}</strong> containing a pdf with your playlist.<br />We hope you will have a lot of fun with your Time for music playlist!</p>
                <div className="border-2 dark:border-gray-600 mt-5 mb-8 bg-gray-50 dark:bg-gray-500 w-full max-w-7xl p-6 rounded-xl overflow-hidden flex flex-col">
                    <p className="font-bold text-dark dark:text-dark-6 border-b border-gray-200 text-xl">Your order</p>
                    <div className="gap-2 grid-cols-2 grid mb-6">
                        <div className="text-gray-500 text-sm py-2">Order number</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 py-2 text-end font-bold">{orderDetails?.orderNumber}</div>
                        <div className="text-gray-500 text-sm py-2">Playlist</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 py-2 text-end font-bold">{orderDetails?.productName}</div>
                    </div>
                    <p className="font-bold text-dark dark:text-dark-6 border-b border-gray-200 text-xl">Your information</p>
                    <div className="gap-2 grid-cols-2 grid mb-6">
                        <div className="text-gray-500 text-sm py-2">Full name</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 py-2 text-end font-bold">{orderDetails?.fullName}</div>
                        <div className="text-gray-500 text-sm py-2">Email</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 py-2 text-end font-bold">{orderDetails?.customerEmail}</div>
                    </div>
                </div>
            </div>
        </main >
    )
}