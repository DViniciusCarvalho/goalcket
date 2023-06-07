import { KICK_USER_ENDPOINT } from "@/lib/endpoints";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";
import { getMemberIndex } from "@/lib/utils";


export function kickUser(groupId: string, userIdToKick: string): Promise<number> {
    const requestConfig = getKickUserRequestConfig(groupId, userIdToKick);
    const promisedResponse = doKickUserRequest(requestConfig);

    return promisedResponse;
}

function getKickUserRequestConfig(groupId: string, userIdToKick: string): Request.KickUserRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        groupId: groupId,
        userIdToKick: userIdToKick
    };

    const parameters: Request.KickUserRequestParameters = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    return parameters;
}

async function doKickUserRequest(requestConfig: Request.KickUserRequestParameters): Promise<number> {
    const response = await fetch(KICK_USER_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}

export function getGroupDataWithoutKickedUser(groupData: Data.GroupData, userId: string): Data.GroupData {
    const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(groupData));
    const members: Data.MemberData[] = deepCopy!.members;
    const memberIndex = getMemberIndex(members, userId);

    deepCopy.members.splice(memberIndex, 1);

    return deepCopy;
}

export function getAppropriateKickUserStatusMessage(httpStatus: number) {
    let statusMessage = "serverError"; 
    let statusType = "error";

    let success = false;
    let isAuthorized = true;

    let groupExists = true;

    if (httpStatus === 200) {
        success = true;
        statusType = "success";
        statusMessage = "kickedWithSuccess";
        statusType = "success";
    }
    else if (httpStatus === 400) {
        statusMessage = "notAdmin";
        statusType = "error";
    }
    else if (httpStatus === 403) {
        isAuthorized = false;
    }
    else if (httpStatus === 404) {
        statusMessage = "groupNotFound";
        groupExists = false;
    }

    return { 
        statusMessage, 
        statusType, 
        success, 
        isAuthorized,
        groupExists
    };
}