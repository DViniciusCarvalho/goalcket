import { LOGON_USER_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";


export function logonUser(name: string, email: string, password: string): Promise<number> {
    const requestConfig = getLogonRequestConfig(name, email, password);
    const promisedResponse = doLogonRequest(requestConfig);

    return promisedResponse;
}

function getLogonRequestConfig(name: string, email: string, password: string): Request.LogonRequestParameters {
    const dataToSend = { 
        name: name, 
        email: email, 
        password: password 
    };

    const parameters: Request.LogonRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(dataToSend)
    };

    return parameters;
}

async function doLogonRequest(requestConfig: Request.LogonRequestParameters): Promise<number> {
    const response = await fetch(LOGON_USER_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}

export function getAppropriateLogonUserStatusMessage(httpStatus: number) {
    let statusMessage = "";
    let statusType = "";

    if (httpStatus === 201){
        statusMessage = "successfulLogon";
        statusType = "success";
    }
    else if (httpStatus === 409){
        statusMessage = "invalidUser";
        statusType = "error";
    }
    else if (httpStatus === 400){
        statusMessage = "invalidInput";
        statusType = "error";
    }
    else {
        statusMessage = "serverError";
        statusType = "error";
    }

    return { statusMessage, statusType };
}