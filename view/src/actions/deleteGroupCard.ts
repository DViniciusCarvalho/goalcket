import { DELETE_GROUP_CARD_ENDPOINT } from "@/lib/endpoints";
import { getCardIndex } from "@/lib/utils";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";

const requestController = new AbortController();
const { signal } = requestController;

export function deleteGroupCard(groupId: string, currentColumn: string, currentCardIdToDelete: string): Promise<number> {
    const requestConfig = getDeleteGroupCardRequestConfig(groupId, currentColumn, currentCardIdToDelete);
    const promisedResponseData = doDeleteGroupCardRequest(requestConfig);
    
    return promisedResponseData;
}

function getDeleteGroupCardRequestConfig(groupId: string, column: string, currentCardIdToDelete: string): 
Request.DeleteCardRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        groupId: groupId,
        column: column,
        cardId: currentCardIdToDelete
    };

    const parameters: Request.DeleteCardRequestParameters = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

async function doDeleteGroupCardRequest(requestConfig: Request.DeleteCardRequestParameters): Promise<number> {
    const response = await fetch(DELETE_GROUP_CARD_ENDPOINT, { ...requestConfig, signal: signal });
    const { status } = response;

    requestController.abort();

    return status;
}

export function getGroupCardsWithoutDeletedCard(groupData: Data.GroupData, currentColumn: string): Data.GroupData {
    const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(groupData));
    const cards: Data.ICard[] = deepCopy!.columns[currentColumn].cards;
    const cardIndex = getCardIndex(cards, currentColumn);

    deepCopy!.columns[currentColumn].cards.splice(cardIndex, 1);

    return deepCopy;
}
