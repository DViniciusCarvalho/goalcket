import { CREATE_GROUP_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";


export function createGroup(username: string, groupName: string, groupPassword: string): 
Promise<{ status: number, responseObject: Response.CreateGroupResponse }> {
    const requestConfig = getCreateGroupRequestConfig(username, groupName, groupPassword);
    const promisedResponse = doCreateGroupRequest(requestConfig);

    return promisedResponse;
}

function getCreateGroupRequestConfig(username: string, groupName: string, groupPassword: string):
Request.CreateGroupRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        username: username,
        groupName: groupName,
        groupPassword: groupPassword
    };

    const parameters: Request.CreateGroupRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

async function doCreateGroupRequest(requestConfig: Request.CreateGroupRequestParameters):
Promise<{ status: number, responseObject: Response.CreateGroupResponse }> {
    const response = await fetch(CREATE_GROUP_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.CreateGroupResponse = await response.json();

    return { status, responseObject };
}

export function getAppropriateCreateGroupStatusMessage(httpStatus: number) {
    let statusMessage = ""; 
    let statusType = "";

    let isAuthorized = true;
    let success = false;

    if (httpStatus === 201){
        statusMessage = "groupCreated";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 400){
        statusMessage = "invalidGroupData";
        statusType = "error";
    }
    else if (httpStatus === 403){ 
        isAuthorized = false;
    }
    else if (httpStatus === 500){
        statusMessage = "serverError";
        statusType = "error";
    }

    return { statusMessage, statusType, isAuthorized, success };
}