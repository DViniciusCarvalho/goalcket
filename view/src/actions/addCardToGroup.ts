import { ADD_CARD_TO_GROUP_ENDPOINT} from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";

const requestController = new AbortController();
const { signal } = requestController;

export function addCardToGroup(groupHash: string, destination: string, priority: string, content: string):
Promise<{ status: number, responseObject: Response.AddCardToGroupResponse }> {
    const requestConfig = getAddCardGroupRequestConfig(groupHash, destination, priority, content);
    const promisedResponse = doAddCardGroupRequest(requestConfig);

    return promisedResponse;
}

function getAddCardGroupRequestConfig(groupHash: string, destination: string, priority: string, content:string):
Request.AddCardRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        hash: groupHash,
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

async function doAddCardGroupRequest(requestConfig: Request.AddCardRequestParameters):
Promise<{ status: number, responseObject: Response.AddCardToGroupResponse }>{
    const response = await fetch(ADD_CARD_TO_GROUP_ENDPOINT, { ...requestConfig, signal: signal });
    const { status } = response;
    const responseObject: Response.AddCardToGroupResponse = await response.json();

    requestController.abort();

    return { status, responseObject };
}

export function getAppropriateAddCardToGroupStatusMessage(httpStatus: number) {
    let statusMessage = "";
    let statusType = "error";

    let isAuthorized = true;
    let success = false;

    if (httpStatus === 200){
        statusMessage = "addCardWithSuccess";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 403){
        isAuthorized = false;
    }
    else if (httpStatus === 404){
        statusMessage = "groupNotFound";
    }
    else if (httpStatus === 500){
        statusMessage = "serverError";
    }
    
    return { statusMessage, statusType, isAuthorized, success };
}