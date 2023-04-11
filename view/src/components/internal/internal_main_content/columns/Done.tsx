import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";

export default function Done(){
    return (
        <section className={mainStyles.done__area}>
            <Description area={"Done"} color={"#070708"}/>
        </section>
    );
}