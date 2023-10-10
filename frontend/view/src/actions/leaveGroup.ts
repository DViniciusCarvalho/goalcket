import { LEAVE_GROUP_ENDPOINT } from "@/lib/endpoints";
import { getGroupOptionIndex } from "@/lib/utils";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";


export function leaveGroup(
    groupId: string
): Promise<number> {

    const requestConfig = getLeaveGroupRequestConfig(groupId);
    const promisedResponseData = doLeaveGroupRequest(requestConfig);
    return promisedResponseData;
}


function getLeaveGroupRequestConfig(
    groupId: string
): Request.LeaveGroupRequestParameters {

    const data = {
        token: localStorage.getItem("token") ?? "",
        groupId: groupId
    };

    const parameters: Request.LeaveGroupRequestParameters = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}


async function doLeaveGroupRequest(
    requestConfig: Request.LeaveGroupRequestParameters
): Promise<number> {

    const response = await fetch(LEAVE_GROUP_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}


export function getUpdatedGroupOptionsList(
    groupsList: Data.GroupOptionData[], 
    groupHash: string
): Data.GroupOptionData[] {

    const deepCopy: Data.GroupOptionData[] = JSON.parse(JSON.stringify(groupsList));
    const groupOptionIndex = getGroupOptionIndex(groupsList, groupHash);

    deepCopy.splice(groupOptionIndex, 1);

    return deepCopy;
}


export function getAppropriateLeaveGroupStatusMessage(
    httpStatus: number
) {
    
    let statusMessage = "serverError"; 
    let statusType = "error";

    let success = false;
    let isAuthorized = true;

    let groupExists = true;

    if (httpStatus === 200) {
        success = true;
        statusType = "success";
        statusMessage = "exitWithSuccess";
    }
    else if (httpStatus === 403) {
        isAuthorized = false;
    }
    else if (httpStatus === 404) {
        statusMessage = "groupNotFound";
        groupExists = false;
    }
    else if (httpStatus === 422) {
        statusMessage = "uniqueAdmin";
    }

    return { 
        statusMessage, 
        statusType, 
        success, 
        isAuthorized,
        groupExists
    };
}