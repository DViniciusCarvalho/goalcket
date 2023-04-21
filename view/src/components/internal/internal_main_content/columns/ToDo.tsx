import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";
import { ToDoProps } from "@/types/types";
import CardsArea from "../card/CardsArea";

export default function ToDo({ color, cards, isGroup }: ToDoProps){

    const todoDescriptionProps = {
        area: "todo",
        color: color, 
        isGroup: isGroup
    }

    return (
        <section className={mainStyles.todo__area}>
            <Description {...todoDescriptionProps}/>
            <CardsArea cards={cards}/>
        </section>
    );
}