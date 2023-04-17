import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Card from "../card/Card";
import { CardsAreaProps } from "@/types/types";

export default function CardsArea({ cards }: CardsAreaProps){
    return (
        <section className={mainStyles.cards__area}>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            {cards && (
                (cards.map(card => (
                    <Card/>
                )))
            )}
        </section>
    );
}