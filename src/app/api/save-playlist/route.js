import { db, admin } from '../../../lib/firebaseAdmin';

export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const { playlistId, playlistData, isDoubleSided } = await req.json();

    if (!playlistId || !playlistData) {
      return new Response(
        JSON.stringify({ error: 'Missing playlistId or playlistData' }),
        { status: 400 }
      );
    }

    await db.collection('playlists').doc(playlistId).set({
      playlist: JSON.parse(playlistData),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isDelivered: false,
      isDoubleSided: isDoubleSided,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error saving playlist:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}