import CardList from '@/components/cards/cardList';

export default async function PdfPage({
    params,
}: {
    params: Promise<{ playlistId: string }>;
}) {
    const { playlistId } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-playlist?playlistId=${playlistId}`, {
        cache: 'no-cache',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch playlist');
    }
    const data = await res.json();
    const playlistData = data.playlistData;

    return (
        <main style={{ fontFamily: 'sans-serif', padding: 0 }}>
            <CardList cards={playlistData.playlist} isDoubleSided={false} />
        </main>
    );
}