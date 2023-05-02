import { MOVE_GROUP_CARD_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Data } from "@/types/data";
import { getCardIndex } from "@/lib/utils";

const requestController = new AbortController();
const { signal } = requestController;

export function moveGroupCard(groupId: string, currentCardDataToMove: Data.ICard, currentColumn: string, destinyColumn: string): Promise<number> {
    const requestConfig = getMoveGroupCardRequestConfig(
        groupId,
        currentColumn,
        destinyColumn,
        currentCardDataToMove as Data.ICard
    );
    const promisedResponseData = doMoveGroupCardRequest(requestConfig);
    
    return promisedResponseData;
}

function getMoveGroupCardRequestConfig(groupId: string, currentColumn: string, destinyColumn: string, cardData: Data.ICard): Request.MoveCardRequestParameters {
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

export function getGroupCardsWithMovedCard(groupData: Data.GroupData, currentCardIdToDelete: string, currentCardDataToMove: Data.ICard, currentColumn: string, destinyColumn: string): Data.GroupData {
    const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(groupData));
    const cards: Data.ICard[] = groupData!.columns[currentColumn].cards;
    const cardIndex = getCardIndex(cards, currentCardIdToDelete);

    deepCopy!.columns[currentColumn].cards.splice(cardIndex, 1);
    deepCopy!.columns[destinyColumn].cards.push(currentCardDataToMove);

    return deepCopy;
}