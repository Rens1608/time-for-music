'use client'

import Grid from "@/components/grid";
import Stepper from "@/components/stepper";
import { MappedTrack } from "../models/MappedTrack";
import { useEffect, useState } from "react";
import { useSpotifyPlaylist } from "../hooks/useSpotifyPlaylists";
import { Playlist } from "../models/Playlist";
import SelectableContainer from "@/components/selectableContainer";
import ProductPage from "@/components/product";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Input } from "@/components/common/Input";

export default function CreatePlayListPage() {
    const { getPlaylist } = useSpotifyPlaylist()
    const [cards, setCards] = useState<MappedTrack[]>([])
    const [spotifyUrl, setSpotifyUrl] = useState<string>("")
    const [isValidSpotifyUrl, setIsValidSpotifyUrl] = useState(true)
    const [playlistName, setPlaylistName] = useState("")
    const [areCardsCreated, setAreCardsCreated] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [isDoubleSided, setIsDoublesided] = useState(false)

    const getPlayListById = () => {
        const id = getSpotifyId(spotifyUrl)
        if (id) {
            getPlaylist(id).then((playlist: Playlist) => {
                setCards(playlist.tracks)
                setPlaylistName(playlist.name)
            })
        }
    }

    const handleSubscription = async (e: any) => {
        e.preventDefault();
        const { data } = await axios.post(
            "/api/payment",
            {
                priceId: "prod_RfED2OSaIzW6FK",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        window.location.assign(data);
    };

    const playlistStep = () => {
        return (
            <div>
                {areCardsCreated ?
                    <div className="mt-4 mb-6 flex flex-col items-center">
                        <h1 className="text-center my-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">{playlistName}</h1>
                        <p className="text-center mb-4 text-body-color dark:text-dark-6">This playlist contains {cards.length} songs. Please check if everything is in order. If so you can continue to finish your order!</p>
                        <div className="flex flex-row gap-10">
                            <SelectableContainer title="Foldable" description="One sided version, requires more paper but better aligned for regular printers." imageSrc="foldable.svg" onClick={() => setIsDoublesided(false)} isSelected={!isDoubleSided} />
                            <SelectableContainer title="Double sided" description="We recommend to only choose this option when you have a duplex printer, due to card alignment isues." imageSrc="double_sided.svg" onClick={() => setIsDoublesided(true)} isSelected={isDoubleSided} />
                        </div>
                        <button
                            onClick={(e) => {
                                console.log(process.env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY!);
                                console.log(process.env.NEXT_PUBLIC_DEV_STRIPE_CHECKOUT_KEY!);

                                loadStripe(process.env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY!);
                                handleSubscription(e)
                            }}
                            className="disabled:opacity-50 h-11 w-max inline-flex font-bold items-center justify-center rounded-md bg-primary px-7 text-center text-base text-white shadow-1 transition duration-300 ease-in-out hover:bg-[#3758f9e6]"
                        >
                            <h2>Continue to Payment</h2>
                        </button>
                    </div>
                    : <>
                        <div className="max-w-5xl px-5 text-center my-8" >
                            <h1 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">Share your playlist</h1>
                            <p className="text-body-color dark:text-dark-6">
                                Let&apos;s start with entering the URL of your playlist in the searchbar below. Open Spotify, find your playlist, click on the three ellipses and then click the &apos;Share&apos; button. Then, copy the URL and paste it in the field below.
                            </p>
                        </div>
                        <div className="flex flex-row gap-5 w-full justify-center mb-8 px-5">
                            <Input className="max-w-72 h-11" placeholder="Fill in your Spotify URL here" value={spotifyUrl} onChange={(e) => setSpotifyUrl(e.target.value)} />
                            <button
                                onClick={() => { getPlayListById(); setAreCardsCreated(true) }}
                                disabled={!isValidSpotifyUrl || spotifyUrl.length == 0}
                                className="disabled:opacity-50 h-11 w-max inline-flex font-bold items-center justify-center rounded-md bg-primary px-7 text-center text-base text-white shadow-1 transition duration-300 ease-in-out hover:bg-[#3758f9e6]"
                            >
                                <h2>Create cards !</h2>
                            </button>
                        </div>
                    </>
                }
            </div>
        );
    }

    const paymentStep = () => {
        return (
            <ProductPage priceId="prod_Rf8ze1Kil41yaF" />
        )
    }

    const getSpotifyId = (url: string): string | null => {
        const match = url.match(/(?:playlist|track|album|artist|show|episode)\/([a-zA-Z0-9]+)(?:\?|$)/);
        return match ? match[1] : null;
    }

    const getStepContent = () => {
        switch (currentStep) {
            case 0:
                return playlistStep()
            case 1:
                return paymentStep()
            default:
                return playlistStep()
        }
    }

    useEffect(() => {
        const spotifyUrlPattern = /^(https?:\/\/)?(open\.spotify\.com\/)(playlist|album)\/[a-zA-Z0-9]+(\?si=[a-zA-Z0-9]+)?$/;
        setIsValidSpotifyUrl(spotifyUrlPattern.test(spotifyUrl));
    }, [spotifyUrl])

    return (
        <main className="mt-28 flex flex-col items-center">
            <Stepper
                steps={['Playlist', 'Payment', 'Done!']}
                currentStep={currentStep}
            />
            {getStepContent()}
            <Grid cards={cards} />
        </main>
    )
}