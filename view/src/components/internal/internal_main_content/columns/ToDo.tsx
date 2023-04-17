import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";
import { ToDoProps } from "@/types/types";
import Card from "../card/Card";
import CardsArea from "../card/CardsArea";

export default function ToDo({ color, cards }: ToDoProps){
    return (
        <section className={mainStyles.todo__area}>
            <Description area={"To do"} color={color}/>
            <CardsArea cards={cards}/>
        </section>
    );
}