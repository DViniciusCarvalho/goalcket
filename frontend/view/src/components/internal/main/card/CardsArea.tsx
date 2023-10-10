import React, { useContext } from "react";
import cardsAreaStyles from "@/styles/internal/main/cards/CardArea.module.css";
import { InternalMainContentContext } from "@/components/internal/main/InternalMainContent";
import Card from "@/components/internal/main/card/Card";
import { Props } from "@/types/props";


export default function CardsArea({ 
    column, 
    cards 
}: Props.CardsAreaProps){

    const { 
        searchCardFilterString 
    } = useContext(InternalMainContentContext);

    return (
        <section 
            className={cardsAreaStyles.cards__area} 
            id={`${column}_area`}
        >
            {cards && (
                (cards.map(card => (
                    (card.content.includes(searchCardFilterString) && (    
                        <Card 
                            key={card.id} 
                            content={card.content} 
                            priority={card.priority} 
                            timestamp={card.timestamp} 
                            id={card.id} 
                            creator={card.creator}
                        />
                    ))
                )))
            )}
        </section>
    );
}