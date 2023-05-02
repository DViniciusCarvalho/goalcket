import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import loginStyle from "@/styles/login/Login.module.css";

import Link from "next/link";
import StatusPopUp from "../common/popups/StatusPopUp";
import GoToHomeButton from "../common/buttons/GoToHomeButton";
import EmailInput from "../common/inputs/EmailInput";
import PasswordInput from "../common/inputs/PasswordInput";
import Button from "../common/buttons/Button";

import { delay } from "@/lib/delay";
import { LOGIN_USER_ENDPOINT } from "@/lib/endpoints";
import { getLoginRequestConfig } from "@/lib/requests";

import { Props } from "@/types/props";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";
import { getAppropriateLoginUserStatusMessage } from "@/lib/validation";


export default function LoginComponent(){

    const router = useRouter();

    const [ emailValue, setEmailValue ] = useState<string>("");
    const [ passwordValue, setPasswordValue ] = useState<string>("");

    const [ loadClass, setLoadClass ] = useState<string>("");
    const [ popUpVisibility, setPopUpVisibility ] = useState<string>("invisible");
    const [ httpStatusContent, setHttpStatusContent ] = useState<string>("");

    const requestController = new AbortController();
    const { signal } = requestController;

    const popUpProps: Props.StatusPopUpProps = {
        content: httpStatusContent,
        visibilityClass: popUpVisibility,
        status: "error"
    };

    const emailInputProps: Props.InputProps = {
        changeValue: changeEmail,
        value: emailValue
    };

    const passwordInputProps: Props.InputProps = {
        margin: "6%",
        changeValue: changePassword,
        value: passwordValue
    };

    const loginButtonProps: Props.ButtonProps = {
        message: "Sign in",
        handleSubmitButtonClick: handleSubmitButtonClick
    };

    let alreadyLoaded = false;

    useEffect(() => {
        if (!alreadyLoaded){
            setLoadClass("loaded");
        }
        alreadyLoaded = true;
    }, []);

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>): void{
        setEmailValue(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>): void{
        setPasswordValue(event.target.value);
    }

    function handleSubmitButtonClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void{
        event.preventDefault();
        const loginRequestParameters = getLoginRequestConfig(emailValue, passwordValue);
        doLoginRequest(loginRequestParameters);
    }

    async function doLoginRequest(requestConfig: Request.LoginRequestParameters) {
        const response = await fetch(LOGIN_USER_ENDPOINT, { ...requestConfig, signal: signal });
        const { status } = response;
        const responseObjectfied: Response.LoginResponse = await response.json();
        requestController.abort();
        handleLoginResponse(status, responseObjectfied);
    }

    function handleLoginResponse(httpStatus: number, response: Response.LoginResponse): void {
        const { token } = response;
        const { statusMessage, isAuthenticated } = getAppropriateLoginUserStatusMessage(httpStatus);

        if (isAuthenticated) {
            localStorage.setItem("token", token);
            router.push("/internal");
        }
        else {
            showPopUp(statusMessage);
            clearInputs();
        }
    }

    async function showPopUp(statusMessage: string) {
        setHttpStatusContent(statusMessage);
        setPopUpVisibility("visible");
        await delay(5000);
        setPopUpVisibility("invisible");
    }

    function clearInputs(): void {
        setEmailValue("");
        setPasswordValue("");
    }

    return (
        <div className={`${loginStyle.form__background} ${loginStyle[loadClass]}`}>
            <GoToHomeButton/>
            <StatusPopUp {...popUpProps}/>
            <div className={loginStyle.form__block}>
                <form action="/login" method="post" className={loginStyle.form__field} autoComplete="off">
                    <h1 className={loginStyle.login__message}>Sign in</h1>
                    <hr className={loginStyle.separation__line}/>
                    <EmailInput {...emailInputProps}/>
                    <PasswordInput {...passwordInputProps}/>
                    <Button {...loginButtonProps}/>       
                    <p className={loginStyle.login__link}> Doesn't have an account? <Link href="/logon">Sign up</Link></p>
                </form>
            </div>
        </div>    
    );
};