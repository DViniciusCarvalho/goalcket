import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";

export default function Doing(){
    return (
        <section className={mainStyles.doing__area}>
            <Description area={"Doing"} color={"#5d24b3"}/>
        </section>
    );
}