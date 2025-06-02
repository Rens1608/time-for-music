'use client'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons"
import Image from "next/image";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useTranslations } from "next-intl";

const CallToAction = () => {
    const [showFront, setShowFront] = useState(true)
    const t = useTranslations('call-to-action')

    return (
        <section className="relative dark:bg-dark flex items-center justify-center h-[40rem]">
            <div className="absolute flex flex-row items-center z-20 gap-20">
                <div className="relative flex flex-col from-black justify-center h-[550px] w-[550px] rounded-xl px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] sm:p-12 lg:px-6 lg:py-10 xl:p-14"
                    style={{ backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.85) 100%),url('/bg.jpg')" }}>
                    <Image
                        src={showFront ? "/card_back.png" : "/card_front.png"}
                        alt="card"
                        className="z-10 mx-auto max-w-full rounded-xl"
                        width={305}
                        height={716}
                    />
                    <div className="absolute cursor-pointer w-21 bottom-5 right-5 h-8 bg-secondary flex items-center hover:bg-[#0BB489] p-2 rounded-lg"
                        onClick={() => setShowFront(!showFront)}
                    >
                        <p className="text-white font-bold text-sm">{t("turn-around")}</p>
                    </div>
                </div>
                <div className="max-w-sm text-white">
                    <h2 className="text-3xl font-bold mb-3">{t("title")}</h2>
                    <p className="mb-2">{t("scan-app")}</p>
                    <p>{t("companion-description")}</p>
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2 items-end mt-3 mb-3">
                            <p className="text-xl font-bold text-green-500 w-5">1.</p>
                            <p className="font-bold">{t("download-app")}</p>
                        </div>
                        <Link
                            href="https://nextjstemplates.com/templates/play"
                            className="flex gap-1 ml-7 w-32 inline-flex items-center justify-center px-2 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-sm hover:shadow-md"
                        >
                            <FontAwesomeIcon className="p-1" icon={faGooglePlay} size="1x" color="white" />
                            <p className="text-xs font-semibold">Google Play</p>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-2 items-start mt-3">
                        <p className="text-xl font-bold text-green-500 w-5">2.</p>
                        <p className="font-bold">{t("scan-instructions")}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-end mt-3">
                        <p className="text-xl font-bold text-green-500 w-5">3.</p>
                        <p className="font-bold">{t("guess-song")}</p>
                    </div>
                </div>
            </div>
            <div className="w-full absolute w-100 z-10 overflow-hidden bg-primary py-20 lg:py-[115px] h-[470px]">
                <div>
                    <span className="absolute left-0 top-0">
                        <FontAwesomeIcon className="rotate-[-23deg]" icon={faMusic} size="10x" color="rgba(255, 255, 255, 0.05)" />
                    </span>
                    <span className="absolute left-[10rem] top-[14rem]">
                        <FontAwesomeIcon className="rotate-[23deg]" icon={faMusic} size="4x" color="rgba(255, 255, 255, 0.05)" />
                    </span>
                    <span className="absolute left-[3rem] top-[22rem]">
                        <FontAwesomeIcon className="rotate-[-13deg]" icon={faMusic} size="3x" color="rgba(255, 255, 255, 0.05)" />
                    </span>
                    <span className="absolute left-[16rem] top-[20rem]">
                        <FontAwesomeIcon className="rotate-[43deg]" icon={faMusic} size="5x" color="rgba(255, 255, 255, 0.05)" />
                    </span>
                    <span className="absolute bottom-0 right-0">
                        <FontAwesomeIcon className="rotate-[-15deg]" icon={faMusic} size="10x" color="rgba(255, 255, 255, 0.05)" />
                    </span>
                    <span className="absolute right-[16rem] top-[20rem]">
                        <FontAwesomeIcon className="rotate-[3deg]" icon={faMusic} size="5x" color="rgba(255, 255, 255, 0.05)" />
                    </span>
                    <span className="absolute bottom-100 right-[10rem]">
                        <FontAwesomeIcon className="rotate-[15deg]" icon={faMusic} size="4x" color="rgba(255, 255, 255, 0.05)" />
                    </span>
                    <span className="absolute top-[1rem] right-[1rem]">
                        <FontAwesomeIcon className="rotate-[15deg]" icon={faMusic} size="3x" color="rgba(255, 255, 255, 0.05)" />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
