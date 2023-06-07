import React from "react";
import actionButtonStyle from "@/styles/common/buttons/ActionButton.module.css";
import { Props } from "@/types/props";

export default function ActionButton({ origin, message, actionFunction }: Props.ActionButtonProps) {
    return (
        <button className={`${actionButtonStyle.action__button} ${actionButtonStyle[origin]}`} onClick={actionFunction}> 
            { message }
        </button>
    );
}
