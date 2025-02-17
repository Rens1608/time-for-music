import { db } from '../../../lib/firebaseAdmin';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const playlistId = searchParams.get('playlistId');

        if (!playlistId) {
            return new Response(
                JSON.stringify({ error: 'Missing playlistId parameter' }),
                { status: 400 }
            );
        }

        const playlistDoc = await db.collection('playlists').doc(playlistId).get();

        if (!playlistDoc.exists) {
            return new Response(
                JSON.stringify({ error: 'Playlist not found' }),
                { status: 404 }
            );
        }

        const playlistData = playlistDoc.data();

        if (playlistData && typeof playlistData.playlist === 'string') {
            try {
                playlistData.playlist = JSON.parse(playlistData.playlist);
            } catch (e) {
                console.error('Error parsing playlist field:', e);
                playlistData.playlist = null;
            }
        }

        return new Response(
            JSON.stringify({ success: true, playlistData }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching playlist:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}