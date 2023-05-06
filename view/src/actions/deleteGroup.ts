import { DELETE_GROUP_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";

export function deleteGroup(groupId: string): Promise<number> {
    const requestConfig = getDeleteGroupRequestConfig(groupId);
    const promisedResponseData = doDeleteGroupRequest(requestConfig);

    return promisedResponseData;
}

function getDeleteGroupRequestConfig(groupId: string): Request.DeleteGroupRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        groupId: groupId
    };

    const parameters: Request.DeleteGroupRequestParameters = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

async function doDeleteGroupRequest(requestConfig: Request.DeleteGroupRequestParameters): Promise<number> {
    const response = await fetch(DELETE_GROUP_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}

export function getAppropriateDeleteGroupStatusMessage(httpStatus: number) {
    let statusMessage = "";
    let statusType = "error";

    let success = false;
    let isAuthorized = true;

    let groupExists = true;

    if (httpStatus === 200) {
        statusMessage = "deletedWithSuccess";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 400) {
        statusMessage = "notAdmin";
    }
    else if (httpStatus === 403) {
        isAuthorized = false;
    }
    else if (httpStatus === 404) {
        statusMessage = "groupNotFound";
    }
    else if (httpStatus === 500) {
        statusMessage = "serverError";
    }

    return { 
        statusMessage, 
        statusType, 
        success, 
        isAuthorized, 
        groupExists 
    };
}
