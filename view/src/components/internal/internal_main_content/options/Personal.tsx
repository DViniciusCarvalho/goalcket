import React from "react";
import ToDo from "../columns/ToDo";
import Doing from "../columns/Doing";
import Done from "../columns/Done";

export default function Personal() {
    
    return (
        <React.Fragment>
            <ToDo/>
            <Doing/>
            <Done/>
        </React.Fragment>
    );
}
