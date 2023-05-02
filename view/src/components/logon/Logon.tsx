import React, { useEffect, useState, useRef } from "react";

import logonStyle from "@/styles/logon/Logon.module.css";

import Link from "next/link";
import StatusPopUp from "@/components/common/popups/StatusPopUp";
import GoToHomeButton from "../common/buttons/GoToHomeButton";
import NameInput from "../common/inputs/NameInput";
import EmailInput from "../common/inputs/EmailInput";
import PasswordInput from "../common/inputs/PasswordInput";
import Button from "@/components/common/buttons/Button";

import { delay } from "@/lib/delay";
import { LOGON_USER_ENDPOINT } from "@/lib/endpoints";
import { getLogonRequestConfig } from "@/lib/requests";
import { getAppropriateLogonUserStatusMessage } from "@/lib/validation";

import { Props } from "@/types/props";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";



export default function logonComponent(){
    
    const [ nameValue, setNameValue ] = useState<string>("");
    const [ emailValue, setEmailValue ] = useState<string>("");
    const [ passwordValue, setPasswordValue ] = useState<string>("");

    const [ popUpVisibility, setPopUpVisibility ] = useState<string>("invisible");
    const [ loadClass, setLoadClass ] = useState<string>("");
    const [ httpStatusContent, setHttpStatusContent ] = useState<string>("");
    const [ requestStatus, setRequestStatus ] = useState<string>("error");

    const requestController = new AbortController();
    const { signal } = requestController;
    
    const statusPopUpProps: Props.StatusPopUpProps = {
        content: httpStatusContent,
        visibilityClass: popUpVisibility,
        status: requestStatus
    };

    const nameInputProps: Props.InputProps = {
        changeValue: changeName,
        value: nameValue
    };

    const emailInputProps: Props.InputProps = {
        changeValue: changeEmail,
        value: emailValue
    };

    const passwordInputProps: Props.InputProps = {
        changeValue: changePassword,
        value: passwordValue
    };

    const logonButtonProps: Props.ButtonProps = {
        message: "Sign up",
        handleSubmitButtonClick: handleSubmitButtonClick
    };

    let alreadyLoaded = false;

    useEffect(() => {
        if (!alreadyLoaded){
            setLoadClass("loaded");
        }
        alreadyLoaded = true;
    }, []);

    function changeName(event: React.ChangeEvent<HTMLInputElement>): void {
        setNameValue(event.target.value);
    }

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>): void {
        setEmailValue(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        setPasswordValue(event.target.value);
    }

    function handleSubmitButtonClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
        event.preventDefault();
        const logonRequestParameters = getLogonRequestConfig(nameValue, emailValue, passwordValue);
        doLogonRequest(logonRequestParameters);
    }

    async function doLogonRequest(requestConfig: Request.LogonRequestParameters) {
        const response = await fetch(LOGON_USER_ENDPOINT, { ...requestConfig, signal: signal });
        const { status } = response;
        requestController.abort();
        handleLogonResponse(status);
    }

    async function handleLogonResponse(httpStatus: number) {
        const { statusMessage, statusType } = getAppropriateLogonUserStatusMessage(httpStatus);

        showPopUp(statusMessage, statusType);
        clearInputs();
    }

    async function showPopUp(statusMessage: string, statusType: string) {
        setRequestStatus(statusType);
        setHttpStatusContent(statusMessage);
        setPopUpVisibility("visible");
        await delay(5000);
        setPopUpVisibility("invisible");
    }

    function clearInputs(): void {
        setNameValue("");
        setEmailValue("");
        setPasswordValue("");
    }


    return (
        <div className={`${logonStyle.form__background} ${logonStyle[loadClass]}`}>
            <GoToHomeButton/>
            <StatusPopUp {...statusPopUpProps}/>
            <div className={logonStyle.form__block}>
                <form action="/logon" method="post" className={logonStyle.form__field} autoComplete="off">
                    <h1 className={logonStyle.logon__message}>Sign up</h1>
                    <hr className={logonStyle.separation__line}/>
                    <NameInput {...nameInputProps}/>
                    <EmailInput {...emailInputProps}/>
                    <PasswordInput {...passwordInputProps}/>
                    <Button {...logonButtonProps}/>   
                    <p className={logonStyle.logon__link}> Already have an account? <Link href="/login">Sign in</Link></p>
                </form>
            </div>
        </div>      
    );
};