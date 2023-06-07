import React, { useContext, useRef } from "react";
import cardStyle from "@/styles/internal/main/cards/Card.module.css";
import { InternalMainContentContext } from "@/components/internal/main/InternalMainContent";
import { abbreviate, formatDate } from "@/lib/utils";
import { Data } from "@/types/data";


export default function Card({ content, priority, timestamp, id, creator }: Data.CardData){

    const { openCard } = useContext(InternalMainContentContext);

    const cardRef = useRef(null);

    function getParentColumn(): string {
        const cardElement = cardRef.current! as HTMLElement;
        const parent = cardElement.parentElement;
        const parentId = parent!.id;
        const currentColumn = parentId.split("_")[0];

        return currentColumn;
    }

    return (
        <section className={cardStyle.card} id={id} 
          onDoubleClick={() => openCard(content, priority, timestamp, id, creator, getParentColumn())}
          ref={cardRef}
        >
            <div className={cardStyle.card__header}>
                <div className={cardStyle.card__header__creator}>
                    <p className={cardStyle.card__header__creator__name}> 
                      { abbreviate(creator.name) }
                    </p>
                    <abbr className={cardStyle.card__header__create__data} title={"mm/dd/yyyy"}>
                      { formatDate(timestamp) }
                    </abbr>
                </div>
                <div className={cardStyle.card__header__priority}>
                    <p className={cardStyle.card__header__priority__text}> { priority }</p>
                    <div className={`${cardStyle.card__header__priority__icon__block} ${cardStyle[priority]}`} />
                </div>
            </div>
            <div className={cardStyle.card__content}>
                <p> {content} </p>
            </div>
        </section>
    )
}
