import { GET_GROUP_CONTENT_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";

export function getGroupContent(roomId: string) {
    const requestConfig = getGroupContentRequestConfig(roomId);
    const promisedResponseData = doGetGroupContentRequest(requestConfig);
    
    return promisedResponseData;
}

function getGroupContentRequestConfig (roomId: string) {
    const parameters = {
        token: localStorage.getItem("token") ?? "",
        roomId: roomId
    };

    const requestConfig: Request.GetGroupContentRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parameters)
    }

    return requestConfig;
}

async function doGetGroupContentRequest(requestConfig: Request.GetGroupContentRequestParameters){
    const response = await fetch(GET_GROUP_CONTENT_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.GetGroupContentResponse = await response.json();

    return { status, responseObject };
}

export function getAppropriateGetGroupStatusMessage(httpStatus: number) {
    let statusMessage = "";

    let success = false;

    let canLoadData = false;

    if (httpStatus === 200){
        success = true;
        canLoadData = true;
    }
    else if (httpStatus === 400){
        statusMessage = "badRequest";
    }
    else if (httpStatus === 403){
        statusMessage = "forbidden";
    }
    else if (httpStatus === 404){
        statusMessage = "notFound";
    }
    else if (httpStatus === 500){
        statusMessage = "internalServerError";
    }

    return { statusMessage, success, canLoadData };
}