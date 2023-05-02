import React from "react";
import mainContentStyles from "@/styles/homepage/main/MainContent.module.css";
import ContentOne from "@/components/homepage/main/cards/ContentOne";
import ContentTwo from "@/components/homepage/main/cards/ContentTwo";
import ContentThree from "@/components/homepage/main/cards/ContentThree";


export default function MainContent(){
    
    return (
        <main className={mainContentStyles.main__content__block}>
            <section className={mainContentStyles.main__content__cards__area}>
                <ContentOne gridArea={"c1"}/>
                <ContentTwo gridArea={"c2"}/>
                <ContentThree gridArea={"c3"}/>
            </section>
        </main>
    );
}