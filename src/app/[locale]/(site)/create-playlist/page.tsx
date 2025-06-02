'use client'

import Grid from "@/components/grid";
import Stepper from "@/components/stepper";
import { MappedTrack } from "../../../models/MappedTrack";
import { useEffect, useState } from "react";
import { useSpotifyPlaylist } from "../../../hooks/useSpotifyPlaylists";
import { Playlist } from "../../../models/Playlist";
import SelectableContainer from "@/components/selectableContainer";
import { Input } from "@/components/common/Input";
import getStripe from "../../../../utils/get-stripejs";
import { nanoid } from "nanoid"
import { useTranslations } from 'next-intl';
import Link from "next/link";

getStripe()

export default function CreatePlayListPage() {
    const t = useTranslations('create-playlist');
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
                        <p className="text-center mb-4 text-body-color dark:text-dark-6">{t('playlist-info', { count: cards.length })}</p>
                        {cards.length == 200 &&
                            <div className="flex justify-center w-full">
                                <div className="mt-5 mb-8 w-[528px] bg-red-600  rounded-xl overflow-hidden flex flex-col p-3">
                                    <p className="text-center font-bold">{t('limit-warning')}</p>
                                </div>
                            </div>
                        }
                        <div className="flex flex-row gap-10">
                            <SelectableContainer
                                title={t('foldable.title')}
                                description={t('foldable.description')}
                                imageSrc="foldable.svg"
                                onClick={() => setIsDoublesided(false)}
                                isSelected={!isDoubleSided}
                            />
                            <SelectableContainer
                                title={t('double-sided.title')}
                                description={t('double-sided.description')}
                                imageSrc="double_sided.svg"
                                onClick={() => setIsDoublesided(true)}
                                isSelected={isDoubleSided}
                            />
                        </div>
                        <div className={`mt-5 mb-8 w-[552px] bg-gray-50 dark:bg-gray-500 rounded-xl overflow-hidden flex flex-col p-3`}>
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" onChange={(e) => { setRefundIsChecked(e.target.checked) }} type="checkbox" value="" className="w-4 h-4 rounded-sm" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('refund-checkbox')}</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" onChange={(e) => { setTermsOfServiceIsChecked(e.target.checked) }} type="checkbox" value="" className="w-4 h-4 rounded-sm" />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {t('terms-checkbox').split('terms of service')[0]}
                                    <Link href="/terms-of-service" className="text-blue-600 dark:text-blue-500 hover:underline">terms of service</Link>
                                </label>
                            </div>
                        </div>
                        <button
                            disabled={!termsOfServiceIsChecked || !refundIsChecked}
                            onClick={() => {
                                handleSubscription()
                            }}
                            className="disabled:opacity-50 h-11 w-max inline-flex font-bold items-center justify-center rounded-md bg-primary px-7 text-center text-base text-white shadow-1 transition duration-300 ease-in-out hover:bg-[#3758f9e6]"
                        >
                            <h2>{t('continue-button')}</h2>
                        </button>
                    </div>
                    : <>
                        <div className="max-w-5xl px-5 text-center my-8" >
                            <h1 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">{t('title')}</h1>
                            <p className="text-body-color dark:text-dark-6">
                                {t('description')}
                            </p>
                        </div>
                        <div className="flex flex-row gap-5 w-full justify-center mb-8 px-5">
                            <Input className="max-w-72 h-11" placeholder={t('url-placeholder')} value={spotifyUrl} onChange={(e) => setSpotifyUrl(e.target.value)} />
                            <button
                                onClick={() => { getPlayListById() }}
                                disabled={!isValidSpotifyUrl || spotifyUrl.length == 0}
                                className="disabled:opacity-50 h-11 w-max inline-flex font-bold items-center justify-center rounded-md bg-primary px-7 text-center text-base text-white shadow-1 transition duration-300 ease-in-out hover:bg-[#3758f9e6]"
                            >
                                <h2>{t('create-button')}</h2>
                            </button>
                        </div>
                        {hasFailed &&
                            <div className="flex justify-center w-full">
                                <div className="mt-5 mb-8 w-[528px] bg-red-600 dark:bg-red-600 rounded-xl overflow-hidden flex flex-col p-3">
                                    <p className="text-center font-bold">{t('error-message')}</p>
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