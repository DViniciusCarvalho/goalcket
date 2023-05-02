import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import loginStyle from "@/styles/login/Login.module.css";

import Link from "next/link";
import StatusPopUp from "../common/popups/StatusPopUp";
import GoToHomeButton from "../common/buttons/GoToHomeButton";
import EmailInput from "../common/inputs/EmailInput";
import PasswordInput from "../common/inputs/PasswordInput";
import Button from "../common/buttons/Button";

import { delay } from "@/lib/utils";

import { loginUser, getAppropriateLoginUserStatusMessage } from "@/actions/loginUser";

import { Props } from "@/types/props";


export default function LoginComponent(){

    const router = useRouter();

    const [ emailValue, setEmailValue ] = useState("");
    const [ passwordValue, setPasswordValue ] = useState("");

    const [ loadClass, setLoadClass ] = useState("");
    
    const [ popUpVisibility, setPopUpVisibility ] = useState("invisible");
    const [ popUpStatusContent, setpopUpStatusContent ] = useState("");

    const popUpProps: Props.StatusPopUpProps = {
        content: popUpStatusContent,
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

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>): void {
        setEmailValue(event.target.value);
    }

    function changePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        setPasswordValue(event.target.value);
    }

    async function handleSubmitButtonClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();

        const { status, responseObject } = await loginUser(emailValue, passwordValue);

        const { token } = responseObject;
        const { statusMessage, isAuthenticated } = getAppropriateLoginUserStatusMessage(status);

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
        setpopUpStatusContent(() => statusMessage);
        setPopUpVisibility(() => "visible");
        await delay(5000);
        setPopUpVisibility(() => "invisible");
    }

    function clearInputs(): void {
        setEmailValue(() => "");
        setPasswordValue(() => "");
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