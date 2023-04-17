import React from "react";
import style from "@/styles/common/popup/PopUp.module.css";
import { PopUpProps } from "@/types/types";
import ErrorIcon from "../../../../public/assets/warning.png";
import SuccessIcon from "../../../../public/assets/successful.png";
import Image from "next/image";
 

export default function PopUp({ content, visibilityClass, status }: PopUpProps) {

    const popUpMessages: {[key: string]: string} = {
        invalidLogin: "Invalid credentials, password or e-mail incorrect.",
        invalidInput: "Invalid credentials, don't use HTML tags and emails must have '@'",
        invalidUser: "E-mail already used. Please, try to use another one.",
        successfulLogon: "Registered with success.",
        serverError: "An error occurred. Please try again later."
    };

    return (
        <div className={`${style.pop__up__box} ${style[visibilityClass]} ${style[status]}`}>
            <Image src={ status === "error"? ErrorIcon : SuccessIcon } alt="status icon" className={style.status__icon}/>
            <p> { popUpMessages[content] } </p>
        </div>
    );
}
