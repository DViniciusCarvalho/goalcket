import { JOIN_GROUP_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";

const requestController = new AbortController();
const { signal } = requestController;

export function joinGroup(username: string, groupHash: string, groupPassword: string): 
Promise<{ status: number, responseObject: Response.JoinGroupResponse }>{
    const requestConfig = getJoinGroupRequestConfig(username, groupHash, groupPassword);
    const promisedResponse = doJoinGroupRequest(requestConfig);

    return promisedResponse;
}

function getJoinGroupRequestConfig(username: string, groupHash: string, groupPassword: string): 
Request.JoinGroupRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        username: username,
        groupHash: groupHash,
        groupPassword: groupPassword
    };

    const parameters: Request.JoinGroupRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

async function doJoinGroupRequest(requestConfig: Request.JoinGroupRequestParameters): 
Promise<{ status: number, responseObject: Response.JoinGroupResponse }> {
    const response = await fetch(JOIN_GROUP_ENDPOINT, { ...requestConfig, signal: signal });
    const { status } = response;
    const responseObject: Response.JoinGroupResponse = await response.json();

    requestController.abort();

    return { status, responseObject };
}

export const getAppropriateJoinGroupStatusMessage = (httpStatus: number) => {
    let statusMessage = "";
    let statusType = "";

    let isAuthorized = true;
    let success = false;

    if (httpStatus === 200) {
        statusMessage = "joinedGroup";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 400) {
        statusMessage = "invalidGroupData";
        statusType = "error";
    }
    else if (httpStatus === 403) {
        isAuthorized = false;
    }
    else if (httpStatus === 404) {
        statusMessage = "groupNotFound";
        statusType = "error";
    }
    else if (httpStatus === 409) {
        statusMessage = "alreadyInGroup";
        statusType = "error";
    }
    else if (httpStatus === 500) {
        statusMessage = "serverError";
        statusType = "error";
    }

    return { statusMessage, statusType, isAuthorized, success };
}