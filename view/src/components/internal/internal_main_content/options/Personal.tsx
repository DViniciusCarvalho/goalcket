import React, { useContext } from "react";
import ToDo from "../columns/ToDo";
import Doing from "../columns/Doing";
import Done from "../columns/Done";
import Functionalities from "../columns/Functionalities";

export default function Personal({ todo, doing, done }: any) {
    
    const toDoProps = { 
        ...todo 
    };
    
    const doingProps = { 
        ...doing 
    };

    const doneProps = { 
        ...done 
    };

    return (
        <React.Fragment>
            <ToDo {...toDoProps}/>
            <Doing {...doingProps}/>
            <Done {...doneProps}/>
            <Functionalities/>
        </React.Fragment>
    );
}
