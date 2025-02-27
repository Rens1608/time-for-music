'use client'

import Grid from "@/components/grid";
import Stepper from "@/components/stepper";
import { MappedTrack } from "../../models/MappedTrack";
import { useEffect, useState } from "react";
import { useSpotifyPlaylist } from "../../hooks/useSpotifyPlaylists";
import { Playlist } from "../../models/Playlist";
import SelectableContainer from "@/components/selectableContainer";
import { Input } from "@/components/common/Input";
import getStripe from "../../../utils/get-stripejs";
import { nanoid } from "nanoid"
getStripe()

export default function CreatePlayListPage() {
    const { getPlaylist } = useSpotifyPlaylist()
    const [cards, setCards] = useState<MappedTrack[]>([])
    const [hasFailed, setHasFailed] = useState(false)
    const [spotifyUrl, setSpotifyUrl] = useState<string>("")
    const [isValidSpotifyUrl, setIsValidSpotifyUrl] = useState(true)
    const [playlistName, setPlaylistName] = useState("")
    const [areCardsCreated, setAreCardsCreated] = useState(false)
    const [currentStep] = useState(0)
    const [isDoubleSided, setIsDoublesided] = useState(false)
    const playlistId = nanoid()
    const [refundIsChecked, setRefundIsChecked] = useState(false)
    const [termsOfServiceIsChecked, setTermsOfServiceIsChecked] = useState(false)

    const getPlayListById = () => {
        try {
            const id = getSpotifyId(spotifyUrl)

            if (id) {
                getPlaylist(id).then((playlist: Playlist) => {
                    setCards(playlist.tracks)
                    setPlaylistName(playlist.name)
                    setAreCardsCreated(true)
                }).catch(() => {
                    setHasFailed(true)
                })
            }
        } catch {
            setHasFailed(true)
        }

    }

    const savePlaylist = async () => {
        const playlist = JSON.stringify(cards);

        const res = await fetch('/api/save-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlistId, "playlistData": playlist, isDoubleSided }),
        });

        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error || 'Error saving product');
        }
        return result;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubscription = async () => {
        savePlaylist()
        fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlistId, "playlistName": playlistName }),
        }).then((res) => res.json())
            .then((data) => window.location.href = data.url);
    };

    const playlistStep = () => {
        return (
            <div>
                {areCardsCreated ?
                    <div className="mt-4 mb-6 flex flex-col items-center">
                        <h1 className="text-center my-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">{playlistName}</h1>
                        <p className="text-center mb-4 text-body-color dark:text-dark-6">This playlist contains {cards.length} songs. Please check if everything is in order. If so you can continue to finish your order!</p>
                        {cards.length == 200 &&
                            <div className="flex justify-center w-full">
                                <div className="mt-5 mb-8 w-[528px] bg-red-600  rounded-xl overflow-hidden flex flex-col p-3">
                                    <p className="text-center font-bold">You’ve reached the current limit of 200 cards per order. We’re working on an option to generate more, stay tuned!</p>
                                </div>
                            </div>
                        }
                        <div className="flex flex-row gap-10">
                            <SelectableContainer title="Foldable" description="One sided version, requires more paper but better aligned for regular printers." imageSrc="foldable.svg" onClick={() => setIsDoublesided(false)} isSelected={!isDoubleSided} />
                            <SelectableContainer title="Double sided" description="Double sided version, requires less paper but can result in minor alignment issues." imageSrc="double_sided.svg" onClick={() => setIsDoublesided(true)} isSelected={isDoubleSided} />
                        </div>
                        <div className={`mt-5 mb-8 w-[552px] bg-gray-50 dark:bg-gray-500 rounded-xl overflow-hidden flex flex-col p-3`}>
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" onChange={(e) => { setRefundIsChecked(e.target.checked) }} type="checkbox" value="" className="w-4 h-4 rounded-sm" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I understand that after the review period expires returns and refunds<br /> are not possible as this is a tailor-made product</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" onChange={(e) => { setTermsOfServiceIsChecked(e.target.checked) }} type="checkbox" value="" className="w-4 h-4 rounded-sm" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the <a href="/terms-of-service" className="text-blue-600 dark:text-blue-500 hover:underline">terms of service</a></label>
                            </div>
                        </div>
                        <button
                            disabled={!termsOfServiceIsChecked || !refundIsChecked}
                            onClick={() => {
                                handleSubscription()
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
                                onClick={() => { getPlayListById() }}
                                disabled={!isValidSpotifyUrl || spotifyUrl.length == 0}
                                className="disabled:opacity-50 h-11 w-max inline-flex font-bold items-center justify-center rounded-md bg-primary px-7 text-center text-base text-white shadow-1 transition duration-300 ease-in-out hover:bg-[#3758f9e6]"
                            >
                                <h2>Create cards !</h2>
                            </button>
                        </div>
                        {hasFailed &&
                            <div className="flex justify-center w-full">
                                <div className="mt-5 mb-8 w-[528px] bg-red-600 dark:bg-red-600 rounded-xl overflow-hidden flex flex-col p-3">
                                    <p className="text-center font-bold">Failed fetching your Spotify playlist. Please ensure that your playlist is set to public mode.</p>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        );
    }

    const getSpotifyId = (url: string): string | null => {
        const match = url.match(/(?:playlist|track|album|artist|show|episode)\/([a-zA-Z0-9]+)(?:\?|$)/);
        return match ? match[1] : null;
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
            {playlistStep()}
            <Grid cards={cards} />
        </main>
    )
}