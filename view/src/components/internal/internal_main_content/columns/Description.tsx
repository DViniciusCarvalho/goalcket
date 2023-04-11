import React, { useState } from "react";
import { DescriptionProps } from "@/types/types";
import mainStyles from "@/styles/internal/main/Main.module.css";

export default function Description({ area, color }: DescriptionProps) {

    const [ descriptionBackground, setDescriptionBackground ] = useState(color);
    const [ initialColor, setInitialColor ] = useState(color);

    function changeColor(event: React.ChangeEvent<HTMLInputElement>){
        setDescriptionBackground(event.target.value);
    }   

    function updateInitialColor(event: React.FocusEvent<HTMLInputElement>){
        const currentValue = event.target.value;
        setInitialColor(currentValue);
    }

    function updateFinalColor(event: React.FocusEvent<HTMLInputElement>){
        const currentValue = event.target.value;
        if (currentValue !== initialColor){
            console.log("MUDOU HEIN");
            // envia pro banco atualizar
        }
    }

    return (
        <div className={mainStyles.description} style={{backgroundColor: descriptionBackground}}>
            <label htmlFor={area}>{area}</label>
            <input type="color" id={area} style={{position: "absolute", zIndex: -9999, backgroundColor: descriptionBackground}} onChange={(event) => changeColor(event)} onFocus={(event) => updateInitialColor(event)} onBlur={(event) => updateFinalColor(event)}/>
        </div>
    );
}
