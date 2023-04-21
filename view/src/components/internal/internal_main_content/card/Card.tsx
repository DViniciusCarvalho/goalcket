import React, { useState } from "react";
import cardStyle from "@/styles/internal/main/Main.module.css";
import { ICard } from "@/types/types";

export default function Card({ content, priority }: ICard){

  return (
    <section className={cardStyle.card}>
        <div className={cardStyle.card__header}></div>
        <div className={cardStyle.card__content}>
          <p></p>
        </div>
    </section>
  )
}
