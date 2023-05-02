import { MOVE_GROUP_CARD_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Data } from "@/types/data";
import { getCardIndex } from "@/lib/utils";

const requestController = new AbortController();
const { signal } = requestController;

export function moveGroupCard(groupId: string, currentCardDataToMove: Data.CardData, currentColumn: string, destinyColumn: string): Promise<number> {
    const requestConfig = getMoveGroupCardRequestConfig(
        groupId,
        currentColumn,
        destinyColumn,
        currentCardDataToMove as Data.CardData
    );
    const promisedResponseData = doMoveGroupCardRequest(requestConfig);
    
    return promisedResponseData;
}

function getMoveGroupCardRequestConfig(groupId: string, currentColumn: string, destinyColumn: string, 
cardData: Data.CardData): Request.MoveCardRequestParameters {
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

async function doMoveGroupCardRequest(requestConfig: Request.MoveCardRequestParameters): Promise<number> {
    const response = await fetch(MOVE_GROUP_CARD_ENDPOINT, {...requestConfig, signal: signal });
    const { status } = response;

    requestController.abort();

    return status;
}

export function getGroupCardsWithMovedCard(groupData: Data.GroupData, currentCardIdToDelete: string, currentCardDataToMove: Data.CardData, currentColumn: string, destinyColumn: string): Data.GroupData {
    const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(groupData));
    const cards: Data.CardData[] = groupData!.columns[currentColumn].cards;
    const cardIndex = getCardIndex(cards, currentCardIdToDelete);

    deepCopy!.columns[currentColumn].cards.splice(cardIndex, 1);
    deepCopy!.columns[destinyColumn].cards.push(currentCardDataToMove);

    return deepCopy;
}

export function getAppropriateMoveGroupCardStatusMessage(httpStatus: number) {
    let statusMessage = "";
    let statusType = "error";

    let success = false;
    let isAuthorized = true;

    if (httpStatus === 200) {
        statusMessage = "deletedWithSuccess";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 400) {
        statusMessage = "noColumnSpecified";
    }
    else if (httpStatus === 403) {
        isAuthorized = false;
    }
    else if (httpStatus === 500) {
        statusMessage = "serverError";
    }

    return { statusMessage, statusType, success, isAuthorized };
}