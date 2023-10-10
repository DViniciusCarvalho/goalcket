import { MOVE_GROUP_CARD_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";
import { Data } from "@/types/data";
import { getCardIndex } from "@/lib/utils";


export function moveGroupCard(
    groupId: string, 
    currentCardDataToMove: Data.CardData, 
    currentColumn: string, 
    destinyColumn: string
): Promise<{ 
    status: number, 
    responseObject: Response.MoveCardFromGroupResponse 
}> {

    const requestConfig = getMoveGroupCardRequestConfig(
        groupId,
        currentColumn,
        destinyColumn,
        currentCardDataToMove as Data.CardData
    );

    const promisedResponseData = doMoveGroupCardRequest(requestConfig);
    
    return promisedResponseData;
}


function getMoveGroupCardRequestConfig(
    groupId: string, 
    currentColumn: string, 
    destinyColumn: string, 
    cardData: Data.CardData
): Request.MoveCardRequestParameters {

    const data = {
        token: localStorage.getItem("token") ?? "",
        groupId: groupId,
        currentColumn: currentColumn,
        destinyColumn: destinyColumn,
        cardData: cardData
    };

    const parameters: Request.MoveCardRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}


async function doMoveGroupCardRequest(
    requestConfig: Request.MoveCardRequestParameters
): Promise<{ 
    status: number, 
    responseObject: Response.MoveCardFromGroupResponse 
}> {

    const response = await fetch(MOVE_GROUP_CARD_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.MoveCardFromGroupResponse = await response.json();

    return { status, responseObject };
}


export function getGroupDataWithMovedCard(
    groupData: Data.GroupData, 
    currentCardIdToDelete: string, 
    currentCardDataToMove: Data.CardData, 
    currentColumn: string, 
    destinyColumn: string, 
    newHash: string
): Data.GroupData {

    const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(groupData));
    const cards: Data.CardData[] = groupData!.columns[currentColumn].cards;
    const cardIndex = getCardIndex(cards, currentCardIdToDelete);

    currentCardDataToMove.id = newHash;

    deepCopy!.columns[currentColumn].cards.splice(cardIndex, 1);
    deepCopy!.columns[destinyColumn].cards.push(currentCardDataToMove);

    return deepCopy;
}


export function getAppropriateMoveGroupCardStatusMessage(
    httpStatus: number
) {

    let statusMessage = "";
    let statusType = "error";

    let success = false;
    let isAuthorized = true;

    let groupExists = true;

    if (httpStatus === 200) {
        statusMessage = "movedWithSuccess";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 400) {
        statusMessage = "noColumnSpecified";
    }
    else if (httpStatus === 403) {
        isAuthorized = false;
    }
    else if (httpStatus === 404) {
        groupExists = false;
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