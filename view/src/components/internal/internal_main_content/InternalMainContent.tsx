import React from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Personal from "./options/Personal";

export default function InternalMainContent(){
    return (
        <main className={mainStyles.main__area}>
            <Personal/>
        </main>
    );
}
