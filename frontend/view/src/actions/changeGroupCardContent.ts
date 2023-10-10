import { CHANGE_GROUP_CARD_CONTENT_ENDPOINT } from "@/lib/endpoints";
import { getCardIndex } from "@/lib/utils";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";


export function changeGroupCardContent(
    groupId: string, 
    cardId: string, 
    currentColumn: string, 
    currentContent: string
): Promise<number> {

    const requestConfig = getChangeGroupCardContentRequestConfig(
        groupId,
        cardId,
        currentColumn,
        currentContent
    );

    const promisedResponseData = doChangeGroupCardContentRequest(requestConfig);

    return promisedResponseData;
}


function getChangeGroupCardContentRequestConfig(
    groupId: string, 
    cardId: string, 
    currentColumn: string,
    newContent: string
): Request.ChangeCardContentRequestParameters {

    const data = {
        token: localStorage.getItem("token") ?? "",
        groupId: groupId,
        currentColumn: currentColumn,
        cardId: cardId,
        newContent: newContent
    };

    const parameters: Request.ChangeCardContentRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}


async function doChangeGroupCardContentRequest(
    requestConfig: Request.ChangeCardContentRequestParameters
): Promise<number> {

    const response = await fetch(CHANGE_GROUP_CARD_CONTENT_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}


export function getGroupDataWithModifiedCard(
    groupData: Data.GroupData, 
    currentColumn: string, 
    cardId: string, 
    newContent: string
): Data.GroupData {
    
    const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(groupData));
    const cards: Data.CardData[] = deepCopy!.columns[currentColumn].cards;
    const cardIndex = getCardIndex(cards, cardId);

    deepCopy!.columns[currentColumn].cards[cardIndex].content = newContent;

    return deepCopy;
}