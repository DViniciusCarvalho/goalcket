import { MOVE_PERSONAL_CARD_ENDPOINT } from "@/lib/endpoints";
import { getCardIndex } from "@/lib/utils";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";


export function movePersonalCard(currentCardDataToMove: Data.CardData, currentColumn: string, destinyColumn: string): Promise<{ status: number, responseObject: Response.MoveCardFromPersonalResponse }> {
    const requestConfig = getMovePersonalCardRequestConfig(currentColumn, destinyColumn, currentCardDataToMove);
    const promisedResponseData = doMovePersonalCardRequest(requestConfig);
    
    return promisedResponseData;
}

function getMovePersonalCardRequestConfig(currentColumn: string, destinyColumn: string, cardData: Data.CardData):
Request.MoveCardRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        currentColumn,
        destinyColumn,
        cardData
    };
    console.log(data)
    const parameters: Request.MoveCardRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

async function doMovePersonalCardRequest(requestConfig: Request.MoveCardRequestParameters):
Promise<{ status: number, responseObject: Response.MoveCardFromPersonalResponse }> {
    const response = await fetch(MOVE_PERSONAL_CARD_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.MoveCardFromPersonalResponse = await response.json();

    return { status, responseObject };
}

export function getPersonalCardsWithMovedCard(personalData: Data.PersonalData, currentCardDataToMove: Data.CardData, currentColumn: string, destinyColumn: string, newHash: string): Data.PersonalData {
    const deepCopy: Data.PersonalData = JSON.parse(JSON.stringify(personalData));
    const cards: Data.CardData[] = deepCopy![currentColumn].cards;
    const cardIndex = getCardIndex(cards, currentColumn);
    currentCardDataToMove.id = newHash;
    deepCopy![currentColumn].cards.splice(cardIndex, 1);
    deepCopy![destinyColumn].cards.push(currentCardDataToMove as Data.CardData);

    return deepCopy;
}

export function getAppropriateMovePersonalCardStatusMessage(httpStatus: number) {
    let statusMessage = "";
    let statusType = "error";

    let success = false;
    let isAuthorized = true;

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
    else if (httpStatus === 500) {
        statusMessage = "serverError";
    }

    return { statusMessage, statusType, success, isAuthorized };
}