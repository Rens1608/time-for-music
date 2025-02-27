import { MappedTrack } from "@/app/models/MappedTrack";
import Card from "./card";

type CardListProps = {
    cards: MappedTrack[];
};

const CardListOneSided: React.FC<CardListProps> = ({ cards }) => {
    return (
        <div className="grid grid-cols-2 gap-2 justify-items-center page-break always">
            {
                cards.map((card, index) => {
                    return (
                        <div className="flex flex-col" key={index}>
                            <div className="w-64 h-64 "><Card url={card.url} title={card.title} artist={card.artist} year={card.year} isFront={false} hasWaterMark={false} /></div>
                            <div className="w-64 h-64 rotate-180"><Card url={card.url} title={card.title} artist={card.artist} year={card.year} isFront={true} hasWaterMark={false} /></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardListOneSided;