import React from "react";
import mainContentStyles from "../../../styles/homepage/main_content/MainContent.module.css";
import ContentOne from "./cards/ContentOne";
import ContentTwo from "./cards/ContentTwo";
import ContentThree from "./cards/ContentThree";

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