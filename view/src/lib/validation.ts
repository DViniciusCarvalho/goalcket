export function getAppropriatePopUpsVisibility(identifier: string) {
    let createJoinGroupVisibility = "invisible";
    let addCardVisibility = "invisible";
    let bigCardVisibility = "invisible";
    let memberInfoVisibility = "invisible";

    if (identifier === "createJoinGroup"){
        createJoinGroupVisibility = "visible";
    }
    else if (identifier === "addCard"){
        addCardVisibility = "visible";
    }
    else if (identifier === "bigCard"){
        bigCardVisibility = "visible";
    }
    else if (identifier === "memberInfo"){
        memberInfoVisibility = "visible";
    }

    return { createJoinGroupVisibility, addCardVisibility, bigCardVisibility, memberInfoVisibility };
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