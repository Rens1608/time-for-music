import { db, admin } from '../../../lib/firebaseAdmin';

export async function PUT(req) {
    try {
        const { playlistId, playlistData } = await req.json();

        if (!playlistId || !playlistData) {
            return new Response(
                JSON.stringify({ error: 'Missing playlistId or playlistData parameter' }),
                { status: 400 }
            );
        }

        const playlistRef = db.collection('playlists').doc(playlistId);
        const playlistDoc = await playlistRef.get()

        if (!playlistDoc.exists) {
            return new Response(
                JSON.stringify({ error: 'Playlist not found' }),
                { status: 404 }
            );
        }

        await playlistRef.update({
            ...playlistData,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating playlist:', error);
        return new Response(
            JSON.stringify({ error: error.message || "Internal Server Error" }),
            { status: 500 }
        );
    }
}