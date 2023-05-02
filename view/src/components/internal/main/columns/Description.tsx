import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import descriptionStyles from "@/styles/internal/main/columns/Description.module.css";
import { InternalPageContext } from "@/pages/internal";
import { changeGroupColumnColor } from "@/actions/changeGroupColumnColor";
import { changePersonalColumnColor } from "@/actions/changePersonalColumnColor";
import { Props } from "@/types/props";


export default function Description({ area, color, isGroup }: Props.DescriptionProps) {

    const router = useRouter();

    const { currentGroupId } = useContext(InternalPageContext);

    const [ descriptionBackground, setDescriptionBackground ] = useState<string>(color);
    const [ initialColor, setInitialColor ] = useState<string>(color);

    function changeColor(event: React.ChangeEvent<HTMLInputElement>){
        setDescriptionBackground(event.target.value);
    }   

    function updateInitialColor(event: React.FocusEvent<HTMLInputElement>){
        const currentValue = event.target.value;
        setInitialColor(currentValue);
    }

    function updateFinalColor(event: React.FocusEvent<HTMLInputElement>){
        const currentColorValue = event.target.value;
        if (currentColorValue !== initialColor){
            if (isGroup){
                handleChangePersonalColumnColor(currentColorValue);
            }
            else {
                handleChangeGroupColumnColor(currentColorValue);
            }
        }
    }

    async function handleChangePersonalColumnColor(currentColorValue: string) {
        const status = await changeGroupColumnColor(currentColorValue, currentGroupId, area);
        if (status === 403) router.push("/login");
    }

    async function handleChangeGroupColumnColor(currentColorValue: string) {
        const status = await changePersonalColumnColor(currentColorValue, area);
        if (status === 403) router.push("/login");
    }

    function getDescriptionTitle() {
        if (area === "todo") return "To Do";
        return area.charAt(0).toUpperCase() + area.slice(1);
    }

    return (
        <div className={descriptionStyles.description} style={{backgroundColor: descriptionBackground}}>
            <label htmlFor={area}>{ getDescriptionTitle()}</label>
            <input type="color" id={area} style={{position: "absolute", zIndex: -9999, backgroundColor: descriptionBackground}} onChange={(event) => changeColor(event)} onFocus={(event) => updateInitialColor(event)} onBlur={(event) => updateFinalColor(event)}/>
        </div>
    );
}
