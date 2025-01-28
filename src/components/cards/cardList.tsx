import React from 'react';
import Card from './card';
import { chunkArray } from '@/lib/utils';
import { MappedTrack } from '@/app/models/MappedTrack';


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

const CardList: React.FC<CardListProps> = ({ cards }) => {
    const cardChunks = chunkArray(cards, 8);

    return (
        <div className='block w-max m-auto'>
            {cardChunks.map((chunk, index) => (
                <React.Fragment key={index}>
                    <style>
                        {`
                            @media print {
                                .page-break {
                                    page-break-after: always;
                                }
                            }
                        `}
                    </style>
                    {/* Fronts section */}
                    <div style={{ gridTemplateColumns: "repeat(2, minmax(0, auto))" }} className="grid justify-items-center page-break always h-screen">
                        {chunk.map((card, index) => (
                            <Card key={`front-${index}`} url={card.url} title={card.title} artist={card.artist} year={card.year} isFront={true} />
                        ))}
                    </div>

                    {/* Backs section */}
                    <div className="grid grid-cols-2 justify-items-center page-break always h-screen">
                        {transformList(chunk).map((card, index) => (
                            <Card key={`back-${index}`} url={card.url} title={card.title} artist={card.artist} year={card.year} isFront={false} />
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default CardList;