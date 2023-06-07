import { CHANGE_PERSONAL_CARD_CONTENT_ENDPOINT } from "@/lib/endpoints";
import { getCardIndex } from "@/lib/utils";
import { Data } from "@/types/data";
import { Request } from "@/types/requests";


export function changePersonalCardContent(cardId: string, currentColumn: string, newContent: string): Promise<number> {
    const requestConfig = getChangePersonalCardContentRequestConfig(
        cardId,
        currentColumn, newContent
    );
    const promisedResponseData = doChangePersonalCardContentRequest(requestConfig);

    return promisedResponseData;
}

function getChangePersonalCardContentRequestConfig(cardId: string, currentColumn: string, newContent: string): Request.ChangeCardContentRequestParameters {
    const data = {
        token: localStorage.getItem("token") ?? "",
        cardId: cardId,
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

async function doChangePersonalCardContentRequest(requestConfig: Request.ChangeCardContentRequestParameters): Promise<number> {
    const response = await fetch(CHANGE_PERSONAL_CARD_CONTENT_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}

export function getPersonalDataWithModifiedCardContent(personalData: Data.PersonalData, cardId: string, currentColumn: string, newContent: string): Data.PersonalData {
    const deepCopy: Data.PersonalData = JSON.parse(JSON.stringify(personalData));
    const cards: Data.CardData[] = deepCopy![currentColumn].cards;
    const cardIndex = getCardIndex(cards, cardId);

    deepCopy![currentColumn].cards[cardIndex].content = newContent;

    return deepCopy;
}