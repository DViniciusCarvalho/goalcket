import React, { useState } from "react";
import cardStyle from "@/styles/internal/main/Main.module.css";

export default function Card(){

  return (
    <section className={cardStyle.card}>
        <div className={cardStyle.card__header}></div>
        <div className={cardStyle.card__content}></div>
    </section>
  )
}
