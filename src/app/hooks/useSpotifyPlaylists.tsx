import { useState } from 'react';
import axios from 'axios';
import { PlaylistResponse } from '../models/PlayListResponse';
import { ExtraTracksResponse } from '../models/ExtraTracksResponse';
import { Playlist } from '../models/Playlist';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

export function useSpotifyPlaylist() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch Spotify Access Token using Client Credentials Flow.
     * @returns {Promise<string>} Access token
     */
    const getAccessToken = async (): Promise<string> => {
        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                new URLSearchParams({ grant_type: 'client_credentials' }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    auth: {
                        username: (process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string),
                        password: (process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string),
                    },
                }
            );
            return response.data.access_token;
        } catch (err) {
            console.error('Error fetching access token:', err);
            throw new Error('Failed to retrieve access token');
        }
    };

    const getPlaylist = async (playlistId: string): Promise<Playlist> => {
        setLoading(true);
        setError(null);
        try {
            const accessToken = await getAccessToken();

            const response = await axios.get<PlaylistResponse>(`${SPOTIFY_API_BASE_URL}/playlists/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            let tracks = response.data.tracks.items;
            let url: string | null = response.data.tracks.next

            while (url && tracks.length < 200) {
                const nextResponse: ExtraTracksResponse = (await axios.get(url!, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })).data;

                tracks = tracks.concat(nextResponse.items)
                url = nextResponse.next || null;
            }

            return {
                name: response.data.name,
                tracks: tracks.map((item) => ({
                    title: item.track.name,
                    artist: item.track.artists[0]?.name || 'Unknown Artist',
                    year: item.track.album.release_date.split('-')[0],
                    url: item.track.href,
                    isFront: true,
                    hasWaterMark: false
                }))
            }
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { getPlaylist, loading, error };
}