import React from 'react';
import { chunkArray } from '@/lib/utils';
import { MappedTrack } from '@/app/models/MappedTrack';
import CardListDoubleSided from './cardListDoubleSided';
import CardListOneSided from './cardListOneSided';


type CardListProps = {
    isDoubleSided: boolean;
    cards: MappedTrack[];
};

const CardList: React.FC<CardListProps> = ({ cards, isDoubleSided }) => {
    const cardChunks = chunkArray(cards, isDoubleSided ? 8 : 4);

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
                    {
                        isDoubleSided ?
                            <CardListDoubleSided cards={chunk} />
                            : <CardListOneSided cards={chunk} />
                    }
                </React.Fragment>
            ))}
        </div>
    );
};

export default CardList;