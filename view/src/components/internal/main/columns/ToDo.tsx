import React from "react";
import columnStyles from "@/styles/internal/main/columns/Column.module.css";
import Description from "@/components/internal/main/columns/Description";
import CardsArea from "@/components/internal/main/card/CardsArea";
import { Props } from "@/types/props";


export default function ToDo({ color, cards, isGroup }: Props.ToDoProps){

    const todoDescriptionProps: Props.DescriptionProps = {
        area: "todo",
        color: color, 
        isGroup: isGroup
    }

    const cardAreaProps: Props.CardsAreaProps = {
        column: "todo",
        cards
    }

    return (
        <section className={columnStyles.todo__area}>
            <Description {...todoDescriptionProps}/>
            <CardsArea {...cardAreaProps}/>
        </section>
    );
}