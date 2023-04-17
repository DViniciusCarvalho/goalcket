import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import loginStyle from "@/styles/login/Login.module.css";
import PopUp from "../common/popup/PopUp";
import GoToHomeButton from "../common/go_to_home/GoToHomeButton";
import EmailInput from "../common/inputs/EmailInput";
import PasswordInput from "../common/inputs/PasswordInput";
import Button from "../common/button/Button";
import { arrangeLoginRequest } from "@/utils/requests";
import { delay } from "@/utils/delay";
import { PopUpProps, InputProps, ButtonProps, LoginRequestParameters, LoginResponse } from "@/types/types";


export default function LoginComponent(){

    const router = useRouter();

    const [ emailValue, setEmailValue ] = useState<string>("");
    const [ passwordValue, setPasswordValue ] = useState<string>("");

    const [ loadClass, setLoadClass ] = useState<string>("");
    const [ popUpVisibility, setPopUpVisibility ] = useState<string>("invisible");
    const [ httpStatusContent, setHttpStatusContent ] = useState<string>("");

    const popUpProps: PopUpProps = {
        content: httpStatusContent,
        visibilityClass: popUpVisibility,
        status: "error"
    };

    const emailInputProps: InputProps = {
        changeValue: changeEmail,
        value: emailValue
    };

    const passwordInputProps: InputProps = {
        margin: "6%",
        changeValue: changePassword,
        value: passwordValue
    };

    const loginButtonProps: ButtonProps = {
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
        const loginRequestParameters = arrangeLoginRequest(emailValue, passwordValue);
        doLoginRequest(loginRequestParameters);
    }

    async function doLoginRequest(requestConfig: LoginRequestParameters) {
        const response = await fetch("http://localhost:3001/login-user", requestConfig);
        const responseStringfied: string = await response.json();
        const responseObjectfied: LoginResponse = JSON.parse(responseStringfied);
        handleLoginResponse(responseObjectfied);
    }

    function handleLoginResponse(response: LoginResponse): void {
        let statusMessage = "";

        if (response.status === 200){
            localStorage.setItem("token", response.token);
            router.push("/internal")
        }
        else if (response.status === 404){
            statusMessage = "invalidLogin";
            showPopUp(statusMessage);
        }
        else if(response.status === 400){
            statusMessage = "invalidInput";
            showPopUp(statusMessage);
        }
        else {
            statusMessage = "serverError";
            showPopUp(statusMessage);
        }
        
        clearInputs();
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
            <PopUp {...popUpProps}/>
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