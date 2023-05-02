import React from "react";
import columnStyles from "@/styles/internal/main/columns/Column.module.css";
import Description from "@/components/internal/main/columns/Description";
import CardsArea from "@/components/internal/main/card/CardsArea";
import { Props } from "@/types/props";

export default function Doing({ color, cards, isGroup }: Props.DoingProps){

    const doingDescriptionProps: Props.DescriptionProps = {
        area: "doing",
        color: color, 
        isGroup: isGroup
    }

    const cardAreaProps: Props.CardsAreaProps = {
        column: "doing",
        cards
    }

    return (
        <section className={columnStyles.doing__area}>
            <Description {...doingDescriptionProps}/>
            <CardsArea {...cardAreaProps}/>
        </section>
    );
}