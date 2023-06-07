import React from "react";
import columnStyles from "@/styles/internal/main/columns/Column.module.css";
import Description from "@/components/internal/main/columns/Description";
import CardsArea from "@/components/internal/main/card/CardsArea";
import { Props } from "@/types/props";


export default function Done({ color, cards, isGroup }: Props.DoneProps){

    const doneDescriptionProps: Props.DescriptionProps = {
        area: "done",
        color: color, 
        isGroup: isGroup
    }

    const cardAreaProps: Props.CardsAreaProps = {
        column: "done",
        cards
    }

    return (
        <section className={columnStyles.done__area}>
            <Description {...doneDescriptionProps}/>
            <CardsArea {...cardAreaProps}/>
        </section>
    );
}