import { ADD_CARD_TO_PERSONAL_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";


export function addCardToPersonal(username: string, destination: string, priority: string, content: string):
Promise<{ status: number, responseObject: Response.AddCardToPersonalResponse }> {
    const requestConfig = getAddCardPersonalRequestConfig(username, destination, priority, content);
    const promisedResponse = doAddCardToPersonalRequest(requestConfig);

    return promisedResponse;
}

function getAddCardPersonalRequestConfig(name: string, destination: string, priority: string, content: string): 
Request.AddCardRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        username: name,
        destination: destination,
        priority: priority,
        content: content
    };

    const parameters: Request.AddCardRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

async function doAddCardToPersonalRequest(requestConfig: Request.AddCardRequestParameters):
Promise<{ status: number, responseObject: Response.AddCardToPersonalResponse }> {
    const response = await fetch(ADD_CARD_TO_PERSONAL_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.AddCardToPersonalResponse = await response.json();

    return { status, responseObject };
}


export function getAppropriateAddCardPersonalStatusMessage(httpStatus: number) {
    let statusMessage = "";
    let statusType = "error";

    let isAuthorized = true;
    let success = false;

    if (httpStatus === 200) {
        statusMessage = "addCardWithSuccess";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 403){
        isAuthorized = false;
    }
    else if (httpStatus === 500) {
        statusMessage = "serverError";
    }

    return { statusMessage, statusType, isAuthorized, success };
}