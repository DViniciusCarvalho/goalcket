import { PROMOTE_MEMBER_ENDPOINT } from "@/lib/endpoints";
import { getMemberIndex } from "@/lib/utils";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";


export function promoteMember(
    groupId: string, 
    userIdToPromove: string
): Promise<number> {

    const requestConfig = getPromoteMemberRequestConfig(
        groupId, 
        userIdToPromove
    );

    const promisedResponse = doPromoteMemberRequest(requestConfig);

    return promisedResponse;
}


function getPromoteMemberRequestConfig(
    groupId: string, 
    userIdToPromove: string
): Request.PromoteMemberRequestParameters {

    const data = {
        token: localStorage.getItem("token") ?? "",
        groupId: groupId,
        userIdToPromove: userIdToPromove
    };

    const parameters: Request.PromoteMemberRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}


async function doPromoteMemberRequest(
    requestConfig: Request.PromoteMemberRequestParameters
): Promise<number> {

    const response = await fetch(PROMOTE_MEMBER_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}


export function getGroupDataWithMemberRoleUpdated(
    groupData: Data.GroupData, 
    userIdToPromote: string
): Data.GroupData {

    const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(groupData));
    const members: Data.MemberData[] = deepCopy.members;
    const memberIndex = getMemberIndex(members, userIdToPromote);

    deepCopy.members[memberIndex].roles?.push("admin");

    return deepCopy;
}


export function getAppropriatePromoteMemberStatusMessage(
    httpStatus: number
) {
    
    let statusMessage = "serverError";
    let statusType = "error";

    let success = false;
    let isAuthorized = true;

    let groupExists = true;

    if (httpStatus === 200) {
        statusMessage = "promotedWithSuccess";
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

    return { 
        statusMessage, 
        statusType, 
        success, 
        isAuthorized, 
        groupExists 
    };
}