import React from "react";
import cardStyles from "@/styles/homepage/main/Card.module.css";
import ClipBoard from "../../../../../public/assets/clipboards.png";
import Image from "next/image";
import { Props } from "@/types/props";


export default function ContentFour({ gridArea }: Props.CardProps){
    
    return (
        <section className={`${cardStyles.card} ${cardStyles.card__three}`} style={{gridArea: gridArea}}>
            <Image src={ClipBoard} alt="clipboard image" width={50}/>
            <div className={cardStyles.card__three__content__area}>
                <h2 className={cardStyles.card__title}>Lorem ipsum</h2>
                <p className={cardStyles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sap
                iente dolorum in omnis voluptas, deserunt qui recusandae ipsa dignissimos repudiandae culpa vero, cumque quas aspernatur sit molestiae ipsam itaque. Officia, maiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptas at, eum voluptatem unde atque cupiditate tenetur? Quidem blanditiis ducimus molestiae necessitatibus, quo minus iusto illum doloribus? Eligendi, eum quisquam?</p>
            </div>
        </section>
    );
}