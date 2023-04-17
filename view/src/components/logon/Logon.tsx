import React, { useEffect, useState } from "react"
import Link from "next/link";
import logonStyle from "@/styles/logon/Logon.module.css";
import PopUp from "@/components/common/popup/PopUp";
import GoToHomeButton from "../common/go_to_home/GoToHomeButton";
import NameInput from "../common/inputs/NameInput";
import EmailInput from "../common/inputs/EmailInput";
import PasswordInput from "../common/inputs/PasswordInput";
import Button from "@/components/common/button/Button";
import { arrangeLogonRequest } from "@/utils/requests";
import { delay } from "@/utils/delay";
import { PopUpProps, InputProps, ButtonProps, LogonRequestParameters, LogonResponse } from "@/types/types";

export default function logonComponent(){
    
    const [ nameValue, setNameValue ] = useState<string>("");
    const [ emailValue, setEmailValue ] = useState<string>("");
    const [ passwordValue, setPasswordValue ] = useState<string>("");

    const [ popUpVisibility, setPopUpVisibility ] = useState<string>("invisible");
    const [ loadClass, setLoadClass ] = useState<string>("");
    const [ httpStatusContent, setHttpStatusContent ] = useState<string>("");
    const [ requestStatus, setRequestStatus ] = useState<string>("error");

    const popUpProps: PopUpProps = {
        content: httpStatusContent,
        visibilityClass: popUpVisibility,
        status: requestStatus
    };

    const nameInputProps: InputProps = {
        changeValue: changeName,
        value: nameValue
    };

    const emailInputProps: InputProps = {
        changeValue: changeEmail,
        value: emailValue
    };

    const passwordInputProps: InputProps = {
        changeValue: changePassword,
        value: passwordValue
    };

    const logonButtonProps: ButtonProps = {
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
        const logonRequestParameters = arrangeLogonRequest(nameValue, emailValue, passwordValue);
        doLogonRequest(logonRequestParameters);
    }

    async function doLogonRequest(requestConfig: LogonRequestParameters) {
        const response = await fetch("http://localhost:3001/logon-user", requestConfig);
        const responseStringfied: string = await response.json();
        const responseObjectfied: LogonResponse = JSON.parse(responseStringfied);
        handleLogonResponse(responseObjectfied);
    }

    async function handleLogonResponse(response: LogonResponse) {
        let statusMessage, requestStatus;

        if (response.status === 201){
            statusMessage = "successfulLogon";
            requestStatus = "success";
        }
        else if (response.status === 409){
            statusMessage = "invalidUser";
            requestStatus = "error";
        }
        else if (response.status === 400){
            statusMessage = "invalidInput";
            requestStatus = "error";
        }
        else {
            statusMessage = "serverError";
            requestStatus = "error";
        }

        showPopUp(statusMessage, requestStatus);
        clearInputs();
    }

    async function showPopUp(statusMessage: string, requestStatus: string) {
        setRequestStatus(requestStatus);
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
            <PopUp {...popUpProps}/>
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