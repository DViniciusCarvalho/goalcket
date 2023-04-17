import React, { useContext } from "react";
import ToDo from "../columns/ToDo";
import Doing from "../columns/Doing";
import Done from "../columns/Done";
import Functionalities from "../columns/Functionalities";

export default function Personal({ toDo, doing, done }: any) {
    
    const toDoProps = { color: toDo.color, cards: toDo.cards };
    const doingProps = { color: doing.color, cards: doing.cards };
    const doneProps = { color: done.color, cards: done.cards };

    return (
        <React.Fragment>
            <ToDo {...toDoProps}/>
            <Doing {...doingProps}/>
            <Done {...doneProps}/>
            <Functionalities/>
        </React.Fragment>
    );
}
