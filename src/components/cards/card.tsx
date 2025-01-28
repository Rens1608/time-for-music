import QRCode from "react-qr-code";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MappedTrack } from "@/app/models/MappedTrack";

type CardDataFront = {
    url: string;
};

type CardDataBack = {
    title: string;
    artist: string;
    year: string;
};

const Card: React.FC<MappedTrack> = ({ title, artist, year, url, isFront }) => {
    return (
        <div className="w-full h-full max-w-64 max-h-64 relative">
            {
                isFront ? <CardFront url={url} />
                    : <CardBack title={title} artist={artist} year={year} />
            }
        </div>
    );
}

const CardFront: React.FC<CardDataFront> = ({ url }) => {
    return (
        <div style={{ WebkitPrintColorAdjust: "exact" }} className="w-full h-full flex flex-col justify-around items-center">
            <Image
                src={"/card_" + Math.floor(Math.random() * 3) + ".png"} // Replace with your image path in the public folder
                alt="Background"
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0 z-0"
            />
            <div className="w-64 h-64" />
            {/* QR code centered in the square */}
            <div className="flex items-center justify-center h-full w-full z-10 absolute">
                <QRCode size={150} value={url} fgColor="#FFFFFF" bgColor="transparent" />
            </div>
        </div>
    );
}

const CardBack: React.FC<CardDataBack> = ({ title, artist, year }) => {
    const colors = [
        "#00A5E3",
        "#8DD7BF",
        "#FF5768",
        "#FFEC59"
    ]

    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        // Select a random color from the colors array
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBgColor(randomColor);
    }, []);

    return (
        <div style={{ backgroundColor: bgColor, WebkitPrintColorAdjust: "exact" }} className="w-full h-full p-1 flex flex-col justify-around items-center">
            <div className="font-bold">{artist}</div>
            <div className="font-bold text-6xl">{year}</div>
            <div className="italic text-center">{title}</div>
            <style>
                {`
                @media print {
                    .card-back {
                        background-color: ${bgColor} !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
                `}
            </style>
        </div>
    );
}

export default Card;