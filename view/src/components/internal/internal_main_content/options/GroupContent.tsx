import React from "react";
import { GroupContentProps } from "@/types/types";
import ToDo from "../columns/ToDo";
import Doing from "../columns/Doing";
import Done from "../columns/Done";
import Functionalities from "../columns/Functionalities";

export default function GroupContent({ name, members, columns }: GroupContentProps){
    
    const toDoProps = { ...columns.todo, isGroup: true };
    const doingProps = { ...columns.doing, isGroup: true };
    const doneProps = { ...columns.done, isGroup: true };

    return (
        <React.Fragment>
            <ToDo {...toDoProps}/>
            <Doing {...doingProps}/>
            <Done {...doneProps}/>
            <Functionalities/>
        </React.Fragment>
    )
}