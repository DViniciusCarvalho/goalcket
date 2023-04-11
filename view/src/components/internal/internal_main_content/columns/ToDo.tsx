import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Description from "./Description";

export default function ToDo(){
    return (
        <section className={mainStyles.todo__area}>
            <Description area={"To do"} color={"#32ab58"}/>
        </section>
    );
}