import React, { useEffect, useState } from "react";

import logonStyle from "@/styles/logon/Logon.module.css";

import Link from "next/link";
import StatusPopUp from "@/components/common/popups/StatusPopUp";
import GoToHomeButton from "../common/buttons/GoToHomeButton";
import NameInput from "../common/inputs/NameInput";
import EmailInput from "../common/inputs/EmailInput";
import PasswordInput from "../common/inputs/PasswordInput";
import Button from "@/components/common/buttons/Button";

import { delay } from "@/lib/utils";

import { logonUser, getAppropriateLogonUserStatusMessage } from "@/actions/logonUser";

import { Props } from "@/types/props";


export default function logonComponent(){
    
    const [ nameValue, setNameValue ] = useState("");
    const [ emailValue, setEmailValue ] = useState("");
    const [ passwordValue, setPasswordValue ] = useState("");

    const [ loadClass, setLoadClass ] = useState("");

    const [ popUpVisibility, setPopUpVisibility ] = useState("invisible");
    const [ popUpStatusContent, setpopUpStatusContent ] = useState("");
    const [ popUpStatusType, setPopUpStatusType ] = useState("error");

    const statusPopUpProps: Props.StatusPopUpProps = {
        content: popUpStatusContent,
        visibilityClass: popUpVisibility,
        status: popUpStatusType
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

    async function handleSubmitButtonClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();

        const status = await logonUser(nameValue, emailValue, passwordValue);
        const { 
            statusMessage, 
            statusType 
        } = getAppropriateLogonUserStatusMessage(status);

        showPopUp(statusMessage, statusType);
        clearInputs();
    }

    async function showPopUp(statusMessage: string, statusType: string) {
        setPopUpStatusType(() => statusType);
        setpopUpStatusContent(() => statusMessage);
        setPopUpVisibility(() => "visible");
        await delay(5000);
        setPopUpVisibility(() => "invisible");
    }

    function clearInputs(): void {
        setNameValue(() => "");
        setEmailValue(() => "");
        setPasswordValue(() => "");
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