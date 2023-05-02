import { MOVE_PERSONAL_CARD_ENDPOINT } from "@/lib/endpoints";
import { getCardIndex } from "@/lib/utils";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";

const requestController = new AbortController();
const { signal } = requestController;

export function movePersonalCard(currentCardDataToMove: Data.ICard, currentColumn: string, destinyColumn: string): Promise<number> {
    const requestConfig = getMovePersonalCardRequestConfig(currentColumn, destinyColumn, currentCardDataToMove);
    const promisedResponseData = doMovePersonalCardRequest(requestConfig);
    
    return promisedResponseData;
}

function getMovePersonalCardRequestConfig(currentColumn: string, destinyColumn: string, cardData: Data.ICard):
Request.MoveCardRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        currentColumn,
        destinyColumn,
        cardData
    };

    const parameters: Request.MoveCardRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

async function doMovePersonalCardRequest(requestConfig: Request.MoveCardRequestParameters):
Promise<number> {
    const response = await fetch(MOVE_PERSONAL_CARD_ENDPOINT, { ...requestConfig, signal: signal });
    const { status } = response;

    requestController.abort();

    return status;
}

export function getPersonalCardsWithMovedCard(personalData: Data.IPersonal, currentCardDataToMove: Data.ICard, currentColumn: string, destinyColumn: string): Data.IPersonal {
    const deepCopy: Data.IPersonal = JSON.parse(JSON.stringify(personalData));
    const cards: Data.ICard[] = deepCopy![currentColumn].cards;
    const cardIndex = getCardIndex(cards, currentColumn);

    deepCopy![currentColumn].cards.splice(cardIndex, 1);
    deepCopy![destinyColumn].cards.push(currentCardDataToMove as Data.ICard);

    return deepCopy;
}

export function getAppropriateMovePersonalCardStatusMessage(httpStatus: number) {
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