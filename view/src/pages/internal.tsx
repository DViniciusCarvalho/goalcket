import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";

import internalStyles from "@/styles/internal/Internal.module.css";

import FirstLayerOverlay from "@/components/common/overlay/FirstLayerOverlay";
import SecondLayerOverlay from "@/components/common/overlay/SecondLayerOverlay";
import InternalHeader from "@/components/internal/header/InternalHeader";
import InternalMainContent from "@/components/internal/main/InternalMainContent";

import { delay } from "@/lib/utils";
import {  
    getAppropriatePopUpsVisibility, 
    getAppropriateBigCardOptionPopUpsVisibility,
} from "@/lib/validation";

import { fetchUserInitialData } from "@/actions/fetchInitialData";

import { 
    getGroupContent, 
    getAppropriateGetGroupStatusMessage 
} from "@/actions/getGroupContent";

import { 
    deletePersonalCard, 
    getPersonalCardsWithoutDeletedCard, 
    getAppropriateDeletePersonalCardStatusMessage 
} from "@/actions/deletePersonalCard";

import { 
    deleteGroupCard, 
    getGroupCardsWithoutDeletedCard, 
    getAppropriateDeleteGroupCardStatusMessage 
} from "@/actions/deleteGroupCard";

import { 
    getPersonalCardsWithMovedCard, 
    movePersonalCard, 
    getAppropriateMovePersonalCardStatusMessage 
} from "@/actions/movePersonalCard";

import { 
    getGroupCardsWithMovedCard, 
    moveGroupCard, 
    getAppropriateMoveGroupCardStatusMessage 
} from "@/actions/moveGroupCard";

import { changePersonalCardContent } from "@/actions/changePersonalCardContent";
import { changeGroupCardContent } from "@/actions/changeGroupCardContent";

import { Data } from "@/types/data";


export const InternalPageContext = createContext<any>(null);

export default function Internal(){

    const router = useRouter();

    const [ username, setUsername ] = useState("");
    const [ personal, setPersonal ] = useState<Data.PersonalDataState>(null);
    const [ groups, setGroups ] = useState<Data.GroupOptionDataList>(null);
    const [ loaded, setLoaded ] = useState(false);
    
    const [ currentRoom, setCurrentRoom ] = useState("personal");
    const [ groupData, setGroupData ] = useState<Data.GroupDataState>(null);
    const [ getGroupWithSuccess, setGetGroupWithSuccess ] = useState(false);
    const [ getGroupRequestStatusMessage, setGetGroupRequestStatusMessage ] = useState("notFound");
    const [ currentGroupId, setCurrentGroupId ] = useState("");
    const [ popUpType, setPopUpType ] = useState("join");
    const [ okToLoad, setOkToLoad ] = useState(false);

    const [ firstLayerOverlayVisibility, setFirstLayerOverlayVisibility ] = useState("invisible");
    const [ secondLayerOverlayVisibility, setSecondLayerOverlayVisibility ] = useState("invisible");

    const [ popUpStatusVisibility, setPopUpStatusVisibility ] = useState("invisible");
    const [ popUpStatusContent, setpopUpStatusContent ] = useState("serverError");
    const [ popUpStatusType, setPopUpStatusType ] = useState("error");

    const [ createJoinGroupPopUpVisibility, setCreateJoinGroupPopUpVisibility ] = useState("invisible");
    const [ addCardPopUpVisibility, setAddCardPopUpVisibility ] = useState("invisible");
    const [ bigCardPopUpVisibility, setBigCardPopUpVisibility ] = useState("invisible");

    const [ deleteCardPopUpVisibility, setDeleteCardPopUpVisibility ] = useState("invisible");
    const [ moveCardPopUpVisibility, setMoveCardPopUpVisibility ] = useState("invisible");

    const [ currentColumn, setCurrentColumn ] = useState("todo");
    const [ currentCardIdToDelete, setCurrentCardIdToDelete ] = useState("");
    const [ currentCardDataToMove, setCurrentCardDataToMove ] = useState({});

    const contextValues = {
        username,
        personal,
        groups,
        addCardPopUpVisibility,
        bigCardPopUpVisibility,
        createJoinGroupPopUpVisibility,
        deleteCardPopUpVisibility,
        moveCardPopUpVisibility,
        changePopUpToVisible,
        hideFirstLayerOverlayAndPopUps,
        handleDeleteCardPopUpState, 
        handleMoveCardPopUpState,
        hideSecondLayerOverlayAndBigCardOptionPopUps,
        handleDeleteCard,
        handleMoveCard,
        handleSaveCard,
        handleChangeRoom,
        currentRoom,
        groupData,
        okToLoad,
        getGroupWithSuccess,
        getGroupRequestStatusMessage,
        currentGroupId,
        popUpType,
        setPopUpType,
        updateOptions,
        updatePersonalCards,
        updateGroupCards,
        popUpStatusVisibility,
        popUpStatusContent,
        popUpStatusType,
        setPopUpStatusVisibility,
        showStatusPopUp,
        currentColumn
    };

    const firstLayerOverlayProps = {
        visibility: firstLayerOverlayVisibility,
        hideFirstLayerOverlayAndPopUps
    };

    const secondLayerOverlayProps = {
        visibility: secondLayerOverlayVisibility,
        hideSecondLayerOverlayAndBigCardOptionPopUps,
    }

    let alreadyReloaded = false;


    useEffect(() => {
        if (!alreadyReloaded){
            alreadyReloaded = true; 
            handleClientEntry();
        }
    }, []);

    async function handleClientEntry() {
        const { status, responseObject } = await fetchUserInitialData();
        const { name, rooms } = responseObject;
        
        const personalData = rooms.personal;
        const userGroups = rooms.groups;

        if (status === 200) {
            setUsername(() => name);
            setPersonal(() => personalData);
            setGroups(() => userGroups);
            setLoaded(() => true);
        }
        else {
            router.push("/login");
        }
    }

    function handleChangeRoom(roomId: string): void {
        setCurrentRoom(() => roomId);
        if (roomId !== "personal") {
            setCurrentGroupId(() => roomId);
            handleGetGroupContent(roomId);
        }
    }

    async function handleGetGroupContent(roomId: string) {
        const { status, responseObject } = await getGroupContent(roomId);
        const groupData = responseObject.group;

        const { 
            statusMessage, 
            success, 
            canLoadData 
        } = getAppropriateGetGroupStatusMessage(status);

        if (success && canLoadData) loadGroupData(groupData);
        
        setGetGroupRequestStatusMessage(() => statusMessage);
        setGetGroupWithSuccess(() => success);
    }

    async function loadGroupData(groupData: Data.GroupData) {
        setOkToLoad(() => false);
        await delay(1);
        setOkToLoad(() => true);
        setGroupData(() => groupData);
    }

    function updateOptions(name: string, hash: string): void {
        setGroups(previous => [
            ...previous as Array<Data.GroupOptionData>, 
            { name: name, hash: hash }
        ]);
    }

    function updatePersonalCards(name: string, timestamp: number, id: string, destinationValue: string, priorityValue: string, contentValue: string): void {
        const newCard: Data.CardData = {
            content: contentValue,
            priority: priorityValue,
            timestamp: timestamp,
            id: id,
            creator: {
                name: name,
                roles: [ "admin" ]
            }
        };

        setPersonal(previous => {
            const deepCopy: Data.PersonalData = JSON.parse(JSON.stringify(previous));
            deepCopy![destinationValue].cards.push(newCard);
            return deepCopy;
        });

        hideFirstLayerOverlayAndPopUps();
    }

    function updateGroupCards(name: string, timestamp: number, id: string, destinationValue: string, priorityValue: string, contentValue: string): void {
        const newCard: Data.CardData = {
            content: contentValue,
            priority: priorityValue,
            timestamp: timestamp,
            id: id,
            creator: {
                name: name,
                roles: [ "admin" ]
            }
        };

        setGroupData(previous => {
            const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(previous));
            deepCopy.columns![destinationValue].cards.push(newCard);
            return deepCopy;
        });   

        hideFirstLayerOverlayAndPopUps();
    }

    /*
     * DELETE CARD
     */

    function handleDeleteCard(): void {
        if (currentRoom === "personal") {
            handleDeletePersonalCard();
        }
        else {
            handleDeleteGroupCard();
        }
    }

    async function handleDeletePersonalCard() {
        const status = await deletePersonalCard(
            currentCardIdToDelete, 
            currentColumn
        );

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized
        } = getAppropriateDeletePersonalCardStatusMessage(status);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success) removeCardFromPersonalDOM();
        }
    }

    function removeCardFromPersonalDOM(): void {
        const personalData = personal as Data.PersonalData;
        const personalCardsWithoutDeleteCard = getPersonalCardsWithoutDeletedCard(
            personalData, 
            currentColumn
        );

        setPersonal(() => personalCardsWithoutDeleteCard);
        hideFirstLayerOverlayAndPopUps();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }

    async function handleDeleteGroupCard() {
        const status = await deleteGroupCard(currentGroupId, currentColumn, currentCardIdToDelete);

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized
        } = getAppropriateDeleteGroupCardStatusMessage(status);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success) removeCardFromGroupDOM();
        }
    }

    function removeCardFromGroupDOM(): void {
        const groupCardsWithoutDeleteCard = getGroupCardsWithoutDeletedCard(
            groupData as Data.GroupData, 
            currentColumn
        );

        setGroupData(() => groupCardsWithoutDeleteCard);
        hideFirstLayerOverlayAndPopUps();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }

    /*
     * MOVE CARD
     */

    function handleMoveCard(destinyColumn: string): void {
        if (currentRoom === "personal") {
            handleMovePersonalCard(destinyColumn);
        }
        else {
            handleMoveGroupCard(destinyColumn);
        }
    }

    async function handleMovePersonalCard(destinyColumn: string) {
        const status = await movePersonalCard(
            currentCardDataToMove as Data.CardData, 
            currentColumn, 
            destinyColumn
        );

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized
        } = getAppropriateMovePersonalCardStatusMessage(status);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success) moveCardFromPersonalDOM(destinyColumn);
        }
    }

    function moveCardFromPersonalDOM(destinyColumn: string): void {
        const personalData = personal as Data.PersonalData;
        const personalCardsWithoutDeleteCard = getPersonalCardsWithMovedCard(
            personalData, 
            currentCardDataToMove as Data.CardData, 
            currentColumn,
            destinyColumn
        );

        setPersonal(() => personalCardsWithoutDeleteCard);
        hideFirstLayerOverlayAndPopUps();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }

    async function handleMoveGroupCard(destinyColumn: string) {
        const status = await moveGroupCard(
            currentRoom, 
            currentCardDataToMove as Data.CardData, 
            currentColumn, 
            destinyColumn
        );
        
        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized
        } = getAppropriateMoveGroupCardStatusMessage(status);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success) moveCardFromGroupDOM(destinyColumn);
        }
    }

    function  moveCardFromGroupDOM(destinyColumn: string): void {
        const personalCardsWithoutDeleteCard = getGroupCardsWithMovedCard(
            groupData as Data.GroupData, 
            currentCardIdToDelete,
            currentCardDataToMove as Data.CardData, 
            currentColumn,
            destinyColumn
        );

        setGroupData(() => personalCardsWithoutDeleteCard);
        hideFirstLayerOverlayAndPopUps();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }

    /* 
     * SAVE CARD
     */

    function handleSaveCard(id: string, oldContent: string, currentContent: string) {
        if (oldContent === currentContent) {
            return;
        }
        else if (currentRoom === "personal") {
            handleChangePersonalCardContent(id, currentColumn, currentContent);
        }
        else {
            handleChangeGroupCardContent(currentRoom, id, currentColumn, currentContent);
        }
    }

    async function handleChangePersonalCardContent(cardId: string, currentColumn: string, currentContent: string) {
        const status = await changePersonalCardContent(cardId, currentColumn, currentContent);
    }

    async function handleChangeGroupCardContent(groupId: string, cardId: string, currentColumn: string, currentContent: string) {
        const status = await changeGroupCardContent(groupId, cardId, currentColumn, currentContent);
    }

    /*
     * UPDATE OF CURRENT BIG CARD DATA
     */

    function handleDeleteCardPopUpState(id: string, column: string): void {
        setCurrentCardIdToDelete(() => id);
        setCurrentColumn(() => column);
        changeBigCardOptionPopUpToVisible("deleteCard");
    }

    function handleMoveCardPopUpState(content: string, priority: string, timestamp: number, id: string, creator: Data.MemberData, column: string): void {
        const currentCardDataToMove = {
            content: content, 
            priority: priority, 
            timestamp: timestamp, 
            id: id, 
            creator: creator
        };

        setCurrentCardDataToMove(() => currentCardDataToMove);
        setCurrentColumn(() => column);
        changeBigCardOptionPopUpToVisible("moveCard");
    }
    
    /*
     * POPUP MANIPULATION
     */

    async function showStatusPopUp(statusMessage: string, statusType: string){
        setpopUpStatusContent(() => statusMessage);
        setPopUpStatusType(() => statusType);
        setPopUpStatusVisibility(() => "visible");
        await delay(4000);
        setPopUpStatusVisibility(() => "invisible");
    }

    function hideFirstLayerOverlayAndPopUps(): void {
        setFirstLayerOverlayVisibility(() => "invisible");
        hideAllPopUps();
    }

    function changePopUpToVisible(identifierString: string): void {
        const { 
            createJoinGroupVisibility, 
            addCardVisibility, 
            bigCardVisibility 
        } = getAppropriatePopUpsVisibility(identifierString);

        setPopUpType(() => "join");
        setCreateJoinGroupPopUpVisibility(() => createJoinGroupVisibility);
        setAddCardPopUpVisibility(() => addCardVisibility);
        setBigCardPopUpVisibility(() => bigCardVisibility);
        setFirstLayerOverlayVisibility(() => "visible");
    }

    function hideAllPopUps(): void {
        setCreateJoinGroupPopUpVisibility(() => "invisible");
        setAddCardPopUpVisibility(() => "invisible");
        setBigCardPopUpVisibility(() => "invisible");
    }

    function hideSecondLayerOverlayAndBigCardOptionPopUps(): void {
        setSecondLayerOverlayVisibility(() => "invisible");
        hideAllBigCardOptionPopUps();
    }

    function changeBigCardOptionPopUpToVisible(identifierString: string): void {
        const { 
            deleteCardVisibility, 
            moveCardVisibility 
        } = getAppropriateBigCardOptionPopUpsVisibility(identifierString);

        setDeleteCardPopUpVisibility(() => deleteCardVisibility);
        setMoveCardPopUpVisibility(() => moveCardVisibility);
        setSecondLayerOverlayVisibility(() => "visible");
    }

    function hideAllBigCardOptionPopUps(): void {
        setDeleteCardPopUpVisibility(() => "invisible");
        setMoveCardPopUpVisibility(() => "invisible");
    }

    return (
        <div className={internalStyles.internal__background}>
            <FirstLayerOverlay {...firstLayerOverlayProps}/>
            <SecondLayerOverlay {...secondLayerOverlayProps}/>
            { loaded && (
                <InternalPageContext.Provider value={contextValues}>
                    <InternalHeader/>
                    <InternalMainContent/>
                </InternalPageContext.Provider>
            )}
        </div>
    );
}