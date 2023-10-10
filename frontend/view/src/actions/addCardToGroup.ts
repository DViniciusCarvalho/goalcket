import { ADD_CARD_TO_GROUP_ENDPOINT} from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";


export function addCardToGroup(
    groupHash: string, 
    destination: string, 
    priority: string, 
    content: string
): Promise<{ 
    status: number, 
    responseObject: Response.AddCardToGroupResponse 
}> {

    const requestConfig = getAddCardGroupRequestConfig(
        groupHash, 
        destination, 
        priority, 
        content
    );

    const promisedResponse = doAddCardGroupRequest(requestConfig);

    return promisedResponse;
}


function getAddCardGroupRequestConfig(
    groupHash: string, 
    destination: string, 
    priority: string, 
    content: string
): Request.AddCardRequestParameters {

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


async function doAddCardGroupRequest(
    requestConfig: Request.AddCardRequestParameters
): Promise<{ 
    status: number, 
    responseObject: Response.AddCardToGroupResponse 
}>{

    const response = await fetch(ADD_CARD_TO_GROUP_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.AddCardToGroupResponse = await response.json();

    return { status, responseObject };
}


export function getAppropriateAddCardToGroupStatusMessage(
    httpStatus: number
) {

    let statusMessage = "";
    let statusType = "error";

    let isAuthorized = true;
    let success = false;

    let groupExists = true;

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
        groupExists = false;
    }
    else if (httpStatus === 500){
        statusMessage = "serverError";
    }
    
    return { 
        statusMessage, 
        statusType, 
        isAuthorized, 
        success, 
        groupExists 
    };
}