import { DELETE_PERSONAL_CARD_ENDPOINT } from "@/lib/endpoints";
import { getCardIndex } from "@/lib/utils";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";

const requestController = new AbortController();
const { signal } = requestController;

export function deletePersonalCard(currentCardIdToDelete: string, currentColumn: string): Promise<number> {
    const requestConfig = getDeletePersonalCardRequestConfig(currentCardIdToDelete, currentColumn);
    const promisedResponseData = doDeletePersonalCardRequest(requestConfig);

    return promisedResponseData;
}

function getDeletePersonalCardRequestConfig(currentCardIdToDelete: string, column: string): 
Request.DeleteCardRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
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

async function doDeletePersonalCardRequest(requestConfig: Request.DeleteCardRequestParameters): Promise<number> {
    const response = await fetch(DELETE_PERSONAL_CARD_ENDPOINT, { ...requestConfig, signal: signal });
    const { status } = response;

    requestController.abort();

    return status;
}

export function getPersonalCardsWithoutDeletedCard(personalData: Data.IPersonal, currentColumn: string): Data.IPersonal {
    const deepCopy: Data.IPersonal = JSON.parse(JSON.stringify(personalData));
    const cards: Data.ICard[] = deepCopy![currentColumn].cards;
    const cardIndex = getCardIndex(cards, currentColumn);
    
    deepCopy![currentColumn].cards.splice(cardIndex, 1);

    return deepCopy;
}

export function getAppropriateDeletePersonalCardStatusMessage(httpStatus: number) {
    let statusMessage = "";
    let statusType = "error";

    let success = false;
    let isAuthorized = true;

    if (httpStatus === 200) {
        statusMessage = "deletedWithSuccess";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 403) {
        isAuthorized = false;
    }
    else if (httpStatus === 404) {
        statusMessage = "cardNotFound";
    }
    else if (httpStatus === 500) {
        statusMessage = "serverError";
    }

    return { statusMessage, statusType, success, isAuthorized };
}


