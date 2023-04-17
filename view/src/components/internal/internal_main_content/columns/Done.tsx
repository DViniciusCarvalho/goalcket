import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";
import { DoneProps } from "@/types/types";
import CardsArea from "../card/CardsArea";

export default function Done({ color, cards }: DoneProps){
    return (
        <section className={mainStyles.done__area}>
            <Description area={"Done"} color={color}/>
            <CardsArea cards={cards}/>
        </section>
    );
}