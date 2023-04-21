import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";
import { DoneProps } from "@/types/types";
import CardsArea from "../card/CardsArea";

export default function Done({ color, cards, isGroup }: DoneProps){

    const doneDescriptionProps = {
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