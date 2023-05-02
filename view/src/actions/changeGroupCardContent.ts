import { CHANGE_GROUP_CARD_CONTENT_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";


export function changeGroupCardContent(groupId: string, cardId: string, currentColumn: string, currentContent: string): Promise<number> {
    const requestConfig = getChangeGroupCardContentRequestConfig(
        groupId,
        cardId,
        currentColumn,
        currentContent
    );
    const promisedResponseData = doChangeGroupCardContentRequest(requestConfig);

    return promisedResponseData;
}

function getChangeGroupCardContentRequestConfig(groupId: string, cardId: string, currentColumn: string, newContent: string): Request.ChangeCardContentRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        groupId: groupId,
        currentColumn: currentColumn,
        newContent: newContent
    };

    const parameters: Request.ChangeCardContentRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

async function doChangeGroupCardContentRequest(requestConfig: Request.ChangeCardContentRequestParameters): 
Promise<number> {
    const response = await fetch(CHANGE_GROUP_CARD_CONTENT_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}