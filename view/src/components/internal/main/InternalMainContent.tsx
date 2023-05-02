import React, { useState, useContext, useRef, createContext } from "react";
import { useRouter } from "next/router";

import mainStyles from "@/styles/internal/main/Main.module.css";
import groupPopUpStyle from "@/styles/common/popups/GroupPopUp.module.css";

import TokenIcon from "../../../../public/assets/token.png";
import LockIcon from "../../../../public/assets/lock.png";
import GroupIcon from "../../../../public/assets/group.png";

import { InternalPageContext } from "@/pages/internal";

import StatusPopUp from "@/components/common/popups/StatusPopUp";
import DeleteCardPopUp from "@/components/common/popups/DeleteCardPopUp";
import MoveCardPopUp from "@/components/common/popups/MoveCardPopUp";
import BigCardPopUp from "@/components/common/popups/BigCardPopUp";
import GroupPopUp from "@/components/common/popups/GroupPopUp";
import PersonalContent from "@/components/internal/main/content/PersonalContent";
import GroupContent from "@/components/internal/main/content/GroupContent";
import ErrorContent from "@/components/internal/main/content/ErrorContent";

import { joinGroup, getAppropriateJoinGroupStatusMessage } from "@/actions/joinGroup";
import { createGroup, getAppropriateCreateGroupStatusMessage } from "@/actions/createGroup";
import { addCardToPersonal, getAppropriateAddCardPersonalStatusMessage } from "@/actions/addCardToPersonal";
import { addCardToGroup, getAppropriateAddCardToGroupStatusMessage } from "@/actions/addCardToGroup";

import { Data } from "@/types/data";
import { Props } from "@/types/props";


export const InternalMainContentContext = createContext<any>(null);

export default function InternalMainContent(){

    const router = useRouter();

    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);
    const searchInputRef = useRef(null);
    const destinationOfCardSelectRef = useRef(null);
    const priorityOfCardSelectRef = useRef(null);
    const contentOfCardRef = useRef(null);
    const hashTextRef = useRef(null);

    const { 
        username, 
        personal, 
        createJoinGroupPopUpVisibility, 
        hideFirstLayerOverlayAndPopUps,
        currentRoom, 
        getGroupWithSuccess, 
        getGroupRequestStatusMessage, 
        okToLoad,
        popUpType, 
        setPopUpType, 
        groupData, 
        updateOptions,
        changePopUpToVisible,
        updatePersonalCards,
        updateGroupCards,
        showStatusPopUp,
        popUpStatusContent,
        popUpStatusType,
        popUpStatusVisibility
    } = useContext(InternalPageContext);

    const [ searchCardFilterString, setSearchCardFilterString ] = useState("");


    const [ bigCardProps, setBigCardProps ] = useState<Props.BigCardProps | null>(null);

    const firstInputElement = firstInputRef.current! as HTMLInputElement;
    const secondInputElement = secondInputRef.current! as HTMLInputElement;

    const requestController = new AbortController();
    const { signal } = requestController;

    const contextProps = {
        destinationRef: destinationOfCardSelectRef,
        priorityRef: priorityOfCardSelectRef,
        contentRef: contentOfCardRef,
        addCard,
        searchInputRef,
        searchMatches,
        searchCardFilterString,
        hashTextRef,
        openCard
    };

    const statusPopUpProps: Props.StatusPopUpProps = {
        content: popUpStatusContent,
        visibilityClass: popUpStatusVisibility,
        status: popUpStatusType
    };

    const commonProps = {
        popUpType,
        hideFirstLayerOverlayAndPopUps,
        handleJoinClick,
        handleCreateClick,
        firstInputRef,
        secondInputRef
    };

    const joinGroupProps: Props.GroupPopUpProps = {
        firstImage: TokenIcon,
        secondImage: LockIcon,
        firstLabelMessage: "Group token:",
        secondLabelMessage: "Group password:",
        ...commonProps
    };

    const createGroupProps: Props.GroupPopUpProps = {
        firstImage: GroupIcon,
        secondImage: LockIcon,
        firstLabelMessage: "Group name:",
        secondLabelMessage: "Group password:",
        ...commonProps
    };

    const personalProps: Data.PersonalData = { 
        ...personal 
    };

    const groupContentProps: Props.GroupContentProps = { 
        ...groupData
    };

    const errorProps: Props.ErrorProps = { 
        getGroupRequestStatusMessage: getGroupRequestStatusMessage 
    };


    function searchMatches(): void {
        const searchInput = searchInputRef.current! as HTMLInputElement;
        const searchValue = searchInput.value;
        setSearchCardFilterString(() => searchValue);
    }

    function handleJoinClick(): void {
        const firstInputValue = firstInputElement.value;
        const secondInputValue = secondInputElement.value;

        if (popUpType === "create") {
            setPopUpType(() => "join");
            clearInputs();
        }
        else {
            handleJoinGroup(firstInputValue, secondInputValue);
        }
    }

    async function handleJoinGroup(groupHash: string, groupPassword: string) {
        const { status, responseObject } = await joinGroup(username, groupHash, groupPassword);
        const { name, hash } = responseObject;

        const { 
            statusMessage, 
            statusType, 
            isAuthorized, 
            success 
        } = getAppropriateJoinGroupStatusMessage(status);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            clearInputs();
            if (success) {
                updateOptions(name, hash);
            }
        }
    }

    function handleCreateClick(): void {
        const groupName = firstInputElement.value;
        const groupPassword = secondInputElement.value;

        if (popUpType === "join") {
            setPopUpType(() => "create");
            clearInputs();
        }
        else {
            handleCreateGroup(username, groupName, groupPassword);
        }
    }

    async function handleCreateGroup(username: string, groupName: string, groupPassword: string) {
        const { status, responseObject } = await createGroup(username, groupName, groupPassword);
        const { name, hash } = responseObject;

        const { 
            statusMessage, 
            statusType, 
            isAuthorized, 
            success 
        } = getAppropriateCreateGroupStatusMessage(status);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            clearInputs();
            if (success) {
                updateOptions(name, hash);
            }
        }
    }

    function addCard(): void {
        const destinationElement = destinationOfCardSelectRef.current! as HTMLSelectElement;
        const priorityElement = priorityOfCardSelectRef.current! as HTMLSelectElement;
        const contentElement = contentOfCardRef.current! as HTMLTextAreaElement;

        const destinationValue = destinationElement.value;
        const priorityValue = priorityElement.value;
        const contentValue = contentElement.value;

        if (currentRoom === "personal") {
            handleAddCardToPersonal(username, destinationValue, priorityValue, contentValue);
        }
        else {
            const groupHash = hashTextRef.current! as HTMLParagraphElement;
            const groupHashValue = groupHash.innerText;
            handleAddCardToGroup(username, groupHashValue, destinationValue, priorityValue, contentValue);
        }
    }

    async function handleAddCardToPersonal(username: string, destination: string, priority: string, content: string) {
        const { status, responseObject } = await addCardToPersonal(username, destination, priority, content);
        const { timestamp, id } = responseObject;

        const {
            statusMessage, 
            statusType, 
            isAuthorized, 
            success 
        } = getAppropriateAddCardPersonalStatusMessage(status);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            clearAddCardInputs();
            if (success) {
                updatePersonalCards(username, timestamp, id, destination, priority, content);
            }
        }
    }

    async function handleAddCardToGroup(username: string, groupHash: string, destination: string, priority: string, content: string) {
        const { status, responseObject } = await addCardToGroup(groupHash, destination, priority, content);
        const { timestamp, id } = responseObject;

        const { 
            statusMessage, 
            statusType, 
            isAuthorized, 
            success 
        } = getAppropriateAddCardToGroupStatusMessage(status);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            clearAddCardInputs();
            if (success) {
                updateGroupCards(username, timestamp, id, destination, priority, content);
            }
        }
    }

    function clearInputs(): void {
        firstInputElement.value = "";
        secondInputElement.value = "";
    }

    function clearAddCardInputs(): void {
        const destinationElement = destinationOfCardSelectRef.current! as HTMLSelectElement;
        const priorityElement = priorityOfCardSelectRef.current! as HTMLSelectElement;
        const contentElement = contentOfCardRef.current! as HTMLTextAreaElement;

        destinationElement.value = "todo";
        priorityElement.value = "low";
        contentElement.value = "";
    }

    function openCard(content: string, priority: string, timestamp: number, id: string, creator: Data.IMember, column: string) {
        const bigCardPartialProps: Props.BigCardProps = { content, priority, timestamp, id, creator, column };

        setBigCardProps(() => bigCardPartialProps);
        changePopUpToVisible("bigCard");
    }

    return (
        <main className={mainStyles.main__area}>
            <InternalMainContentContext.Provider value={contextProps}>
                <StatusPopUp {...statusPopUpProps}/>
                <DeleteCardPopUp/>
                <MoveCardPopUp/>
                {bigCardProps && (<BigCardPopUp {...bigCardProps as Props.BigCardProps}/>)}
                <div className={`${groupPopUpStyle.pop__up__container} ${groupPopUpStyle[createJoinGroupPopUpVisibility]}`}>
                    { popUpType === "join"? <GroupPopUp {...joinGroupProps}/> : <GroupPopUp {...createGroupProps}/>}
                </div>
                {(currentRoom === "personal")? <PersonalContent {...personalProps}/> : (
                    okToLoad? (getGroupWithSuccess ? <GroupContent {...groupContentProps}/> : <ErrorContent {...errorProps}/>) : ""
                )}
            </InternalMainContentContext.Provider>
        </main>
    );
}