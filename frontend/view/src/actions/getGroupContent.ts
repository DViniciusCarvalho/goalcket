import { GET_GROUP_CONTENT_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";

export function getGroupContent(roomId: string): 
Promise<{ status: number, responseObject: Response.GetGroupContentResponse }> {
    const requestConfig = getGroupContentRequestConfig(roomId);
    const promisedResponseData = doGetGroupContentRequest(requestConfig);
    
    return promisedResponseData;
}

function getGroupContentRequestConfig(roomId: string): Request.GetGroupContentRequestParameters {
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

async function doGetGroupContentRequest(requestConfig: Request.GetGroupContentRequestParameters): 
Promise<{ status: number, responseObject: Response.GetGroupContentResponse }>{
    const response = await fetch(GET_GROUP_CONTENT_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.GetGroupContentResponse = await response.json();

    return { status, responseObject };
}

export function getAppropriateGetGroupStatusMessage(httpStatus: number) {
    let statusMessage = "";

    let success = false;

    let canLoadData = false;

    let groupExists = true;

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
        groupExists = false;
    }
    else if (httpStatus === 500){
        statusMessage = "internalServerError";
    }

    return { statusMessage, success, canLoadData, groupExists };
}