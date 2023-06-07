import { Data } from "@/types/data";

export function getAppropriatePopUpsVisibility(identifier: string): {[key: string]: Data.PopUpVisibility} {
    let createJoinGroupVisibility: Data.PopUpVisibility = "invisible";
    let addCardVisibility: Data.PopUpVisibility = "invisible";
    let bigCardVisibility: Data.PopUpVisibility = "invisible";
    let memberInfoVisibility: Data.PopUpVisibility = "invisible";
    let groupInfoVisibility: Data.PopUpVisibility = "invisible";

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
    else if (identifier === "groupInfo") {
        groupInfoVisibility = "visible";
    }

    return { 
        createJoinGroupVisibility, 
        addCardVisibility, 
        bigCardVisibility, 
        memberInfoVisibility, 
        groupInfoVisibility 
    };
}

export function getAppropriateBigCardOptionPopUpsVisibility(identifier: string): {[key: string]: Data.PopUpVisibility} {
    let deleteCardVisibility: Data.PopUpVisibility = "invisible";
    let moveCardVisibility: Data.PopUpVisibility = "invisible";

    if (identifier === "deleteCard"){
        deleteCardVisibility = "visible";
    }
    else if (identifier === "moveCard"){
        moveCardVisibility = "visible";
    }

    return { 
        deleteCardVisibility, 
        moveCardVisibility 
    };
}