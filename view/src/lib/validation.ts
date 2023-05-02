export function getAppropriatePopUpsVisibility(identifier: string) {
    let createJoinGroupVisibility = "invisible";
    let addCardVisibility = "invisible";
    let bigCardVisibility = "invisible";

    if (identifier === "createJoinGroup"){
        createJoinGroupVisibility = "visible";
    }
    else if (identifier === "addCard"){
        addCardVisibility = "visible";
    }
    else if (identifier === "bigCard"){
        bigCardVisibility = "visible";
    }

    return { createJoinGroupVisibility, addCardVisibility, bigCardVisibility };
}

export function getAppropriateBigCardOptionPopUpsVisibility(identifier: string) {
    let deleteCardVisibility = "invisible";
    let moveCardVisibility = "invisible";

    if (identifier === "deleteCard"){
        deleteCardVisibility = "visible";
    }
    else if (identifier === "moveCard"){
        moveCardVisibility = "visible";
    }

    return { deleteCardVisibility, moveCardVisibility };
}