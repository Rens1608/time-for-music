"use client";

import { useState } from "react";
import { useSpotifyPlaylist } from './hooks/useSpotifyPlaylists';
import { MappedTrack } from "./models/MappedTrack";
import CardList from "@/components/cards/cardList";
import CallToAction from "@/components/callToAction";
import ScrollUp from "@/components/common/ScrollUp";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <CallToAction />
      <Pricing />
      <Faq />
      <Contact />
    </main>
    // <div>
    //   <CallToAction></CallToAction>
    //   {cards.length > 0 &&
    //     <div className="print:p-0 print:bg-white">
    //       <h1 className="text-2xl font-bold mb-4 print:hidden">Print Cards</h1>
    //       <CardList cards={cards} />
    //     </div>
    //   }
    // </div>
  );
}
