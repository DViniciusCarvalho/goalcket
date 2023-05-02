export const getAppropriateLogonUserStatusMessage = (httpStatus: number) => {
    let statusMessage = "";
    let statusType = "";

    if (httpStatus === 201){
        statusMessage = "successfulLogon";
        statusType = "success";
    }
    else if (httpStatus === 409){
        statusMessage = "invalidUser";
        statusType = "error";
    }
    else if (httpStatus === 400){
        statusMessage = "invalidInput";
        statusType = "error";
    }
    else {
        statusMessage = "serverError";
        statusType = "error";
    }

    return { statusMessage, statusType };
}

export const getAppropriateLoginUserStatusMessage = (httpStatus: number) => {
    let statusMessage = "";
    let isAuthenticated = false;

    if (httpStatus === 200){
        isAuthenticated = true;
    }
    else if(httpStatus === 400){
        statusMessage = "invalidInput";
    }
    else if (httpStatus === 404){
        statusMessage = "invalidLogin";
    }
    else if (httpStatus === 500){
        statusMessage = "serverError";
    }

    return { statusMessage, isAuthenticated };
}

export const getAppropriateCreateGroupStatusMessage = (httpStatus: number) => {
    let statusMessage = ""; 
    let statusType = "";

    let isAuthorized = true;
    let success = false;

    if (httpStatus === 201){
        statusMessage = "groupCreated";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 400){
        statusMessage = "invalidGroupData";
        statusType = "error";
    }
    else if (httpStatus === 403){ 
        isAuthorized = false;
    }
    else if (httpStatus === 500){
        statusMessage = "serverError";
        statusType = "error";
    }

    return { statusMessage, statusType, isAuthorized, success };
}

export const getAppropriateJoinGroupStatusMessage = (httpStatus: number) => {
    let statusMessage = "";
    let statusType = "";

    let isAuthorized = true;
    let success = false;

    if (httpStatus === 200) {
        statusMessage = "joinedGroup";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 400) {
        statusMessage = "invalidGroupData";
        statusType = "error";
    }
    else if (httpStatus === 403) {
        isAuthorized = false;
    }
    else if (httpStatus === 404) {
        statusMessage = "groupNotFound";
        statusType = "error";
    }
    else if (httpStatus === 409) {
        statusMessage = "alreadyInGroup";
        statusType = "error";
    }
    else if (httpStatus === 500) {
        statusMessage = "serverError";
        statusType = "error";
    }

    return { statusMessage, statusType, isAuthorized, success };
}

export const getAppropriateGetGroupStatusMessage = (httpStatus: number) => {
    let statusMessage = "";

    let success = false;

    let canLoadData = false;

    if (httpStatus === 200){
        success = true;
        canLoadData = true;
    }
    else if (httpStatus === 400){
        statusMessage = "badRequest";
    }
    else if (httpStatus === 403){
        statusMessage = "forbidden";
    }
    else if (httpStatus === 404){
        statusMessage = "notFound";
    }
    else if (httpStatus === 500){
        statusMessage = "internalServerError";
    }

    return { statusMessage, success, canLoadData };
}

export const getAppropriateAddCardPersonalStatusMessage = (httpStatus: number) => {
    let statusMessage = "";
    let statusType = "error";

    let isAuthorized = true;
    let success = false;

    if (httpStatus === 200) {
        statusMessage = "addCardWithSuccess";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 403){
        isAuthorized = false;
    }
    else if (httpStatus === 500) {
        statusMessage = "serverError";
    }

    return { statusMessage, statusType, isAuthorized, success };
}

export const getAppropriateAddCardGroupStatusMessage = (httpStatus: number) => {
    let statusMessage = "";
    let statusType = "error";

    let isAuthorized = true;
    let success = false;

    if (httpStatus === 200){
        statusMessage = "addCardWithSuccess";
        statusType = "success";
        success = true;
    }
    else if (httpStatus === 403){
        isAuthorized = false;
    }
    else if (httpStatus === 404){
        statusMessage = "groupNotFound";
    }
    else if (httpStatus === 500){
        statusMessage = "serverError";
    }
    
    return { statusMessage, statusType, isAuthorized, success };
}

export const getAppropriatePopUpsVisibility = (identifier: string) => {
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

export const getAppropriateBigCardOptionPopUpsVisibility = (identifier: string) => {
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

export const getAppropriateDeletePersonalCardStatusMessage = (httpStatus: number) => {
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

export const getAppropriateDeleteGroupCardStatusMessage = (httpStatus: number) => {
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

export const getAppropriateMovePersonalCardStatusMessage = (httpStatus: number) => {
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

export const getAppropriateMoveGroupCardStatusMessage = (httpStatus: number) => {
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