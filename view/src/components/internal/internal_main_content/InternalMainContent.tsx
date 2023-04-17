import React, { useContext } from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Personal from "./options/Personal";
import { InternalPageContext } from "@/pages/internal";
import JoinGroupPopUp from "./join_group_popup/JoinGroupPopUp";

export default function InternalMainContent(){

    const { personal } = useContext(InternalPageContext);

    const personalProps = {
        toDo: personal.todo,
        doing: personal.doing,
        done: personal.done
    };

    return (
        <main className={mainStyles.main__area}>
            <JoinGroupPopUp/>
            <Personal {...personalProps}/>
        </main>
    );
}
