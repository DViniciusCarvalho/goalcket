import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { DescriptionProps } from "@/types/types";
import mainStyles from "@/styles/internal/main/Main.module.css";
import { InternalPageContext } from "@/pages/internal";
import { getChangeColorPersonalRequestConfig, getChangeColorGroupRequestConfig } from "@/utils/requests";
import { ChangeColorGroupRequestParameters, ChangeColorPersonalRequestParameters } from "@/types/types";

export default function Description({ area, color, isGroup }: DescriptionProps) {

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
        const userToken = localStorage.getItem("token") ?? "";
        if (currentColorValue !== initialColor){
            if (isGroup){
                const groupRequestConfig = getChangeColorGroupRequestConfig(userToken, currentColorValue, currentGroupId, area);
                doChangeColorGroupRequest(groupRequestConfig);
            }
            else {
                const personalRequestConfig = getChangeColorPersonalRequestConfig(userToken, currentColorValue, area);
                doChangeColorPersonalRequest(personalRequestConfig);
            }
        }
    }

    async function doChangeColorGroupRequest(groupRequestConfig: ChangeColorGroupRequestParameters) {
        const response = await fetch("http://localhost:3001/change-group-color", groupRequestConfig);
        const responseStringfied = await response.json();
        const responseObject = JSON.parse(responseStringfied);
        console.log(responseObject)
        if (responseObject.status === 403) router.push("/login");
    }

    async function doChangeColorPersonalRequest(personalRequestConfig: ChangeColorPersonalRequestParameters) {
        const response = await fetch("http://localhost:3001/change-personal-color", personalRequestConfig);
        const responseStringfied = await response.json();
        const responseObject = JSON.parse(responseStringfied);
        console.log(responseObject)
        if (responseObject.status === 403) router.push("/login");
    }

    return (
        <div className={mainStyles.description} style={{backgroundColor: descriptionBackground}}>
            <label htmlFor={area}>{area.charAt(0).toUpperCase() + area.slice(1)}</label>
            <input type="color" id={area} style={{position: "absolute", zIndex: -9999, backgroundColor: descriptionBackground}} onChange={(event) => changeColor(event)} onFocus={(event) => updateInitialColor(event)} onBlur={(event) => updateFinalColor(event)}/>
        </div>
    );
}
