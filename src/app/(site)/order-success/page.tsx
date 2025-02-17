'use client'

import Stepper from "@/components/stepper";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
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
                const res = await fetch(`/api/order-details/${session_id}`);
                const data = await res.json();
                setOrderDetails(data);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };

        const generateAndSendPdf = async () => {
            fetch(`/api/generate-and-send-pdf/${session_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
        fetchSessionDetails();
        generateAndSendPdf()
    }, [session_id]);

    return (
        <main className="mt-28 flex flex-col items-center">
            <Stepper
                steps={['Playlist', 'Payment', 'Done!']}
                currentStep={3}
            />
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-center my-4 text-3xl font-bold text-dark dark:text-gray-200 sm:text-4xl md:text-[40px] md:leading-[1.2]">Thank you!</h1>
                <p className="text-center mb-4 text-body-color dark:text-dark-6">We will send an e-mail to: <strong>{orderDetails?.customerEmail}</strong> containing a pdf with your playlist.<br />We hope you will have a lot of fun with your Time for music playlist!</p>
                <div className="flex flex-col items-center mb-6">
                    <div className="flex flex-row gap-2 items-end mt-3 mb-6">
                        <p className="font-bold text-body-color dark:text-dark-6">Download the companion app to get started</p>
                    </div>
                    <Link
                        href="https://nextjstemplates.com/templates/play"
                        className="flex gap-1 w-32 inline-flex items-center justify-center px-2 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-sm hover:shadow-md"
                    >
                        <FontAwesomeIcon className="p-1" icon={faGooglePlay} size="1x" color="white" />
                        <p className="text-xs font-semibold">Google Play</p>
                    </Link>
                </div>
                <div className="border-2 dark:border-gray-900 mt-5 mb-16 bg-gray-50 dark:bg-gray-800 w-full max-w-7xl p-6 rounded-xl overflow-hidden flex flex-col">
                    <p className="font-bold text-dark dark:text-gray-300 border-b border-gray-200 text-xl">Your order</p>
                    <div className="gap-2 grid-cols-2 grid mb-6 mt-2">
                        <div className="text-gray-500 dark:text-gray-300 text-sm py-2">Order number</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 py-2 text-end font-bold">{orderDetails?.orderNumber}</div>
                        <div className="text-gray-500 dark:text-gray-300 text-sm py-2">Playlist</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 py-2 text-end font-bold">{orderDetails?.productName}</div>
                    </div>
                    <p className="font-bold text-dark dark:text-gray-300 border-b border-gray-200 text-xl">Your information</p>
                    <div className="gap-2 grid-cols-2 grid mb-6 mt-2">
                        <div className="text-gray-500 dark:text-gray-300 text-sm py-2">Full name</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 py-2 text-end font-bold">{orderDetails?.fullName}</div>
                        <div className="text-gray-500 dark:text-gray-300 text-sm py-2">Email</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 py-2 text-end font-bold">{orderDetails?.customerEmail}</div>
                    </div>
                </div>
                <Link
                    href="/"
                    className="inline-flex mb-32 font-bold items-center justify-center rounded-md bg-primary px-7 py-[12px] text-center text-base text-white shadow-1 transition duration-300 ease-in-out hover:bg-primary/90"
                >
                    <p>Return to homepage</p>
                </Link>
            </div>
        </main >
    )
}