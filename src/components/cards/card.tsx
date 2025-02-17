'use client'
import QRCode from "react-qr-code";
import { MappedTrack } from "@/app/models/MappedTrack";
import Image from "next/image";
import { useEffect, useState } from "react";

type CardDataFront = {
    url: string;
    hasWaterMark: boolean;
    image: string;
};

type CardDataBack = {
    title: string;
    artist: string;
    year: string;
    color: string;
};

const Card: React.FC<MappedTrack> = ({ url, title, artist, year, isFront, hasWaterMark }) => {
    const colors = [
        "#00A5E3",
        "#8DD7BF",
        "#FF5768",
        "#FFEC59"
    ]

    const [bgColor, setBgColor] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        setBgColor(colors[Math.floor(Math.random() * colors.length)])
        setImage("/card_" + Math.floor(Math.random() * 3) + ".png")
    }, [])

    return (
        <div className="w-full h-full relative">
            {
                isFront ? <CardFront url={url} hasWaterMark={hasWaterMark} image={image} />
                    : <CardBack title={title} artist={artist} year={year} color={bgColor} />
            }
        </div>
    );
}

const CardFront: React.FC<CardDataFront> = ({ url, hasWaterMark, image }) => {
    return (
        <div style={{ WebkitPrintColorAdjust: "exact" }} className="w-full h-full flex flex-col justify-around items-center">
            <img
                src={image}
                alt="Background"
                style={{ objectFit: "cover" }}
                className="absolute inset-0 z-0 w-full h-full object-cover"
            />
            <div className="w-64 h-64" />
            <div className="flex items-center justify-center h-full w-full z-10 absolute">
                <QRCode size={150} value={url} fgColor="#FFFFFF" bgColor="transparent" />
                {
                    hasWaterMark &&
                    <Image
                        src={"/watermark.svg"}
                        alt="card"
                        className="z-10 mx-auto absolute max-w-full opacity-75"
                        width={255}
                        height={616}
                    />
                }

            </div>
        </div>
    );
}

const CardBack: React.FC<CardDataBack> = ({ title, artist, year, color }) => {
    return (
        <div style={{ backgroundColor: color, WebkitPrintColorAdjust: "exact" }} className="w-full h-full p-1 flex flex-col justify-around items-center">
            <div className="font-bold">{artist}</div>
            <div className="font-bold text-6xl">{year}</div>
            <div className="italic text-center">{title}</div>
            <style>
                {`
                @media print {
                    .card-back {
                        background-color: ${color} !important;
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