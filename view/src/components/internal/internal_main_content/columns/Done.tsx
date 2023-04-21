import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";
import { DoneProps, DescriptionProps } from "@/types/types";
import CardsArea from "../card/CardsArea";

export default function Done({ color, cards, isGroup }: DoneProps){

    const doneDescriptionProps: DescriptionProps = {
        area: "done",
        color: color, 
        isGroup: isGroup
    }

    return (
        <section className={mainStyles.done__area}>
            <Description {...doneDescriptionProps}/>
            <CardsArea cards={cards}/>
        </section>
    );
}