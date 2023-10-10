import { LOGIN_USER_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";


export function loginUser(
    email: string, 
    password: string
): Promise<{ 
    status: number, 
    responseObject: Response.LoginResponse 
}> {

    const requestConfig = getLoginRequestConfig(email, password);
    const promisedResponse = doLoginRequest(requestConfig);

    return promisedResponse;
}


function getLoginRequestConfig(
    email: string, 
    password: string
): Request.LoginRequestParameters {

    const dataToSend = { 
        email: email, 
        password: password 
    };

    const parameters: Request.LoginRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
    }

    return parameters;
}


async function doLoginRequest(
    requestConfig: Request.LoginRequestParameters
): Promise<{ 
    status: number, 
    responseObject: Response.LoginResponse 
}> {

    const response = await fetch(LOGIN_USER_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.LoginResponse = await response.json();

    return { status, responseObject };
}


export function getAppropriateLoginUserStatusMessage(
    httpStatus: number
) {

    let statusMessage = "";
    let isAuthenticated = false;

    if (httpStatus === 200){
        isAuthenticated = true;
    }
    else if(httpStatus === 400){
        statusMessage = "invalidInput";
    }
    else if (httpStatus === 404){
        statusMessage = "invalidLogin";
    }
    else if (httpStatus === 500){
        statusMessage = "serverError";
    }

    return { 
        statusMessage, 
        isAuthenticated 
    };
}