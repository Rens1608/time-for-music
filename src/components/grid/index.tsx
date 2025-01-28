import { MappedTrack } from "@/app/models/MappedTrack";
import { useEffect, useState } from "react";
import Card from "../cards/card";

const CardGrid = ({ cards }: { cards: MappedTrack[] }) => {
    const [gridItems, setGridItems] = useState<MappedTrack[]>([])
    const [isFront, setIsFront] = useState(false)

    useEffect(() => {
        setGridItems(cards)
    }, [cards])

    return (
        <div className="flex flex-col px-4">
            {gridItems.length > 0 && <button
                onClick={() => setIsFront(!isFront)}
                className="disabled:opacity-50 h-11 w-max inline-flex font-bold items-center justify-center rounded-md bg-secondary px-7 text-center text-base text-white shadow-1 transition duration-300 ease-in-out hover:bg-[#0BB489]"
            >
                <h2>{isFront ? "See back" : "See front"}</h2>
            </button>}
            <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pt-5">
                {
                    gridItems.length > 0 ?
                        gridItems.map((item, i) => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden" >
                                <Card title={item.title} artist={item.artist} year={item.year} url={item.url} isFront={isFront} />
                            </div>
                        ))
                        : Array.from({ length: 20 }).map((item, i) => (
                            <div key={i} className="aspect-square rounded-xl bg-gray-300 overflow-hidden" >
                                <div className=" w-64 h-64 relative" />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default CardGrid;