import { GET_GROUP_CONTENT_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";

const requestController = new AbortController();
const { signal } = requestController;


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
    const response = await fetch(GET_GROUP_CONTENT_ENDPOINT, { ...requestConfig, signal: signal });
    const { status } = response;
    const responseObject: Response.GetGroupContentResponse = await response.json();

    requestController.abort();

    return { status, responseObject };
}

// function handleGetGroupContentResponse(httpStatus: number, response: Response.GetGroupContentResponse): void {
//     const { group } = response;
//     const { statusMessage, success, canLoadData } = getAppropriateGetGroupStatusMessage(httpStatus);

//     if (success && canLoadData) loadGroupData(group);
    
//     setGetGroupRequestStatusMessage(() => statusMessage);
//     setGetGroupWithSuccess(() => success);
// }