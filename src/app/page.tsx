"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSpotifyPlaylist } from './hooks/useSpotifyPlaylists';
import { MappedTrack } from "./models/MappedTrack";
import CardList from "@/components/ui/cardList";

export default function Home() {
  const { getPlaylist } = useSpotifyPlaylist()
  const [cards, setCards] = useState<MappedTrack[]>([])
  const [playlistId, setPlaylistId] = useState<string>("")

  const getPlayListById = (id: string) => {
    getPlaylist(id).then((playlist: MappedTrack[]) => {
      setCards(playlist)
    })
  }

  return (
    <div>
      <div className="print:hidden">
        <Input onChange={(id) => setPlaylistId(id.target.value)} />
        <Button onClick={() => getPlayListById(playlistId)}> Fetch playlist </Button>
      </div>
      {cards.length > 0 &&
        <div className="print:p-0 print:bg-white">
          <h1 className="text-2xl font-bold mb-4 print:hidden">Print Cards</h1>
          <CardList cards={cards} />
        </div>
      }
    </div>
  );
}
