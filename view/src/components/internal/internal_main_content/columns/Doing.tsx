import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";
import { DoingProps } from "@/types/types";
import CardsArea from "../card/CardsArea";

export default function Doing({ color, cards, isGroup }: DoingProps){

    const doingDescriptionProps = {
        area: "doing",
        color: color, 
        isGroup: isGroup
    }

    return (
        <section className={mainStyles.doing__area}>
            <Description {...doingDescriptionProps}/>
            <CardsArea cards={cards}/>
        </section>
    );
}