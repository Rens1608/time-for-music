import { useState } from 'react';
import axios from 'axios';
import { PlaylistResponse } from '../models/PlayListResponse';
import { MappedTrack } from '../models/MappedTrack';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = '13dc194028b64a3b80a84a4e3f3d562e';
const CLIENT_SECRET = '66881d54bf284a3390cdaf5ce12513ed';

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
                        username: CLIENT_ID,
                        password: CLIENT_SECRET,
                    },
                }
            );
            return response.data.access_token;
        } catch (err) {
            console.error('Error fetching access token:', err);
            throw new Error('Failed to retrieve access token');
        }
    };

    const getPlaylist = async (playlistId: string): Promise<MappedTrack[]> => {
        setLoading(true);
        setError(null);
        try {
            const accessToken = await getAccessToken();

            const response = await axios.get<PlaylistResponse>(`${SPOTIFY_API_BASE_URL}/playlists/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data.tracks.items.map((item) => ({
                title: item.track.name,
                artist: item.track.artists[0]?.name || 'Unknown Artist',
                year: item.track.album.release_date.split('-')[0],
                url: item.track.href,
                isFront: true,
            }));
        } catch (err) {
            console.error('Error fetching playlist:', err);
            setError('Failed to fetch playlist');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { getPlaylist, loading, error };
}