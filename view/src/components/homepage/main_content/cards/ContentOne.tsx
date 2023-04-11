import React from "react";
import cardStyles from "@/styles/homepage/main_content/Card.module.css";
import { CardProps } from "@/types/types";
import Productivity from "../../../../../public/assets/productivity.png";
import Image from "next/image";

export default function ContentOne({ gridArea }: CardProps){

    return (
        <section className={`${cardStyles.card} ${cardStyles.card__one}`} style={{gridArea: gridArea}}>
            <Image src={Productivity} alt="productivity image" width={50} />
            <h2 className={cardStyles.card__title}>Lorem ipsum</h2>
            <br/>
            <p className={cardStyles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sap
                iente dolorum in omnis voluptas, deserunt qui recusandae ipsa dignissimos repudiandae culpa vero, cumque quas aspernatur sit molestiae ipsam itaque. Officia, maiores! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores ea porro earum vel ab. Amet modi ut eius nisi eligendi quod sed cumque non, expedita consectetur laborum sequi ab officiis. </p>
        </section>
    );
}