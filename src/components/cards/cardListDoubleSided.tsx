import { MappedTrack } from "@/app/models/MappedTrack";
import Card from "./card";

type CardListProps = {
    cards: MappedTrack[];
};

const transformList = (list: MappedTrack[]): MappedTrack[] => {
    const transformedList = [...list];
    for (let i = 0; i < list.length; i += 2) {
        [transformedList[i], transformedList[i + 1]] = [transformedList[i + 1], transformedList[i]];
    }
    return transformedList.filter((item) => item !== undefined);
};

const CardListDoubleSided: React.FC<CardListProps> = ({ cards }) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-2 justify-items-center page-break always">
                {cards.map((card, index) => {
                    const isLastOdd = cards.length % 2 === 1 && index === cards.length - 1;
                    return (
                        <div className={`w-64 h-64 ${isLastOdd ? "col-span-2 justify-self-center" : ""}`} key={`front-${index}`}>
                            <Card url={card.url} title={card.title} artist={card.artist} year={card.year} isFront={true} hasWaterMark={false} />
                        </div>
                    )
                })}
            </div>

            {/* Backs section */}
            <div className="grid gap-2 grid-cols-2 justify-items-center page-break always">
                {transformList(cards).map((card, index) => {
                    const isLastOdd = cards.length % 2 === 1 && index === cards.length - 1;
                    return (
                        <div className={`w-64 h-64 ${isLastOdd ? "col-span-2 justify-self-center" : ""}`} key={`back-${index}`}>
                            <Card url={card.url} title={card.title} artist={card.artist} year={card.year} isFront={false} hasWaterMark={false} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CardListDoubleSided;