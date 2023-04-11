import React from "react";
import heroSectionStyles from "../../../styles/homepage/hero_section/HeroSection.module.css";
import { useRouter } from "next/router";

export default function HeroSection(){

    const router = useRouter();

    const goToLogon = () => {
        router.push("/logon");
    }

    return (
        <div className={heroSectionStyles.hero__section__background}>
            <div className={heroSectionStyles.hero__section__main__content}>
                <h1 className={heroSectionStyles.hero__section__main__content__title}>Goalcket, </h1>
                <p className={heroSectionStyles.hero__section__main__content__text}>The kanban software that will take off productivity
                and achievement of your company's goals. Join us now, and start managing your business in the most efficient way.</p>
                <button className={heroSectionStyles.hero__section__join__us__button} onClick={goToLogon}> JOIN US</button>
            </div>         
        </div>
    );
}