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

import { 
    JOIN_GROUP_ENDPOINT, 
    CREATE_GROUP_ENDPOINT,
    ADD_CARD_TO_PERSONAL_ENDPOINT,
    ADD_CARD_TO_GROUP_ENDPOINT
} from "@/lib/endpoints";
import { 
    getCreateGroupRequestConfig, 
    getJoinGroupRequestConfig, 
    getAddCardPersonalRequestConfig,
    getAddCardGroupRequestConfig
} from "@/lib/requests";
import { 
    getAppropriateCreateGroupStatusMessage, 
    getAppropriateJoinGroupStatusMessage, 
    getAppropriateAddCardPersonalStatusMessage, 
    getAppropriateAddCardGroupStatusMessage 
} from "@/lib/validation";

import { Data } from "@/types/data";
import { Props } from "@/types/props";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";


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
        name, 
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


    function searchMatches() {
        const searchInput = searchInputRef.current! as HTMLInputElement;
        const searchValue = searchInput.value;
        setSearchCardFilterString(() => searchValue);
    }

    function handleJoinClick() {
        const firstInputValue = firstInputElement.value;
        const secondInputValue = secondInputElement.value;

        if (popUpType === "create") {
            setPopUpType(() => "join");
            clearInputs();
            return 0;
        }

        const requestConfig = getJoinGroupRequestConfig(name, firstInputValue, secondInputValue);
        doJoinGroupRequest(requestConfig);
    }

    async function doJoinGroupRequest(requestConfig: Request.JoinGroupRequestParameters){
        const response = await fetch(JOIN_GROUP_ENDPOINT, { ...requestConfig, signal: signal });
        const { status } = response;
        const responseObject: Response.JoinGroupResponse = await response.json();
        requestController.abort();
        handleJoinGroupResponse(status, responseObject);
    }

    function handleJoinGroupResponse(httpStatus: number, response: Response.JoinGroupResponse){
        const { name, hash } = response;
        const { statusMessage, statusType, isAuthorized, success } = getAppropriateJoinGroupStatusMessage(httpStatus);

        if (!isAuthorized) router.push("/login");

        showStatusPopUp(statusMessage, statusType);
        clearInputs();

        if (success) updateOptions(name, hash);
    }

    function handleCreateClick() {
        const groupName = firstInputElement.value;
        const groupPassword = secondInputElement.value;

        if (popUpType === "join") {
            setPopUpType(() => "create");
            clearInputs();
            return 0;
        }

        const requestConfig = getCreateGroupRequestConfig(name, groupName, groupPassword);
        doCreateGroupRequest(requestConfig);
    }

    async function doCreateGroupRequest(requestConfig: Request.CreateGroupRequestParameters){
        const response = await fetch(CREATE_GROUP_ENDPOINT, { ...requestConfig, signal: signal });
        const { status } = response;
        const responseObject: Response.CreateGroupResponse = await response.json();
        requestController.abort();
        handleCreateGroupResponse(status, responseObject);
    }

    function handleCreateGroupResponse(httpStatus: number, response: Response.CreateGroupResponse) {
        const { name, hash } = response;
        const { statusMessage, statusType, isAuthorized, success } = getAppropriateCreateGroupStatusMessage(httpStatus);

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            clearInputs();
    
            if (success) updateOptions(name, hash);
        }
    }

    function addCard(){
        const destinationElement = destinationOfCardSelectRef.current! as HTMLSelectElement;
        const priorityElement = priorityOfCardSelectRef.current! as HTMLSelectElement;
        const contentElement = contentOfCardRef.current! as HTMLTextAreaElement;

        const destinationValue = destinationElement.value;
        const priorityValue = priorityElement.value;
        const contentValue = contentElement.value;

        if (currentRoom === "personal") {
            const requestConfig = getAddCardPersonalRequestConfig(name, destinationValue, priorityValue, contentValue);
            doAddCardPersonalRequest(requestConfig);
        }
        else {
            const groupHash = hashTextRef.current! as HTMLParagraphElement;
            const groupHashValue = groupHash.innerText;
            const requestConfig = getAddCardGroupRequestConfig(groupHashValue, destinationValue, priorityValue, contentValue);
            doAddCardGroupRequest(requestConfig);
        }
    }

    async function doAddCardPersonalRequest(requestConfig: Request.AddCardRequestParameters){
        const response = await fetch(ADD_CARD_TO_PERSONAL_ENDPOINT, { ...requestConfig, signal: signal });
        const { status } = response;
        const responseObject: Response.AddCardToPersonalResponse = await response.json();
        requestController.abort();
        handleAddCardToPersonalResponse(status, responseObject);
    }

    function handleAddCardToPersonalResponse(httpStatus: number, response: Response.AddCardToPersonalResponse) {
        const { timestamp, id } = response;

        const { statusMessage, statusType, isAuthorized, success } = getAppropriateAddCardPersonalStatusMessage(httpStatus);

        const destinationElement = destinationOfCardSelectRef.current! as HTMLSelectElement;
        const priorityElement = priorityOfCardSelectRef.current! as HTMLSelectElement;
        const contentElement = contentOfCardRef.current! as HTMLTextAreaElement;

        const destinationValue = destinationElement.value;
        const priorityValue = priorityElement.value;
        const contentValue = contentElement.value;

        if (!isAuthorized) {
            router.push("/login");
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            clearAddCardInputs();
    
            if (success) updatePersonalCards(name, timestamp, id, destinationValue, priorityValue, contentValue);
        }
    }

    async function doAddCardGroupRequest(requestConfig: Request.AddCardRequestParameters){
        const response = await fetch(ADD_CARD_TO_GROUP_ENDPOINT, { ...requestConfig, signal: signal });
        const { status } = response;
        const responseObject: Response.AddCardToGroupResponse = await response.json();
        requestController.abort();
        handleAddCardToGroupResponse(status, responseObject);
    }

    function handleAddCardToGroupResponse(httpStatus: number, response: Response.AddCardToGroupResponse) {
        const { timestamp, id } = response;

        const { statusMessage, statusType, isAuthorized, success } = getAppropriateAddCardGroupStatusMessage(httpStatus);

        const destinationElement = destinationOfCardSelectRef.current! as HTMLSelectElement;
        const priorityElement = priorityOfCardSelectRef.current! as HTMLSelectElement;
        const contentElement = contentOfCardRef.current! as HTMLTextAreaElement;

        const destinationValue = destinationElement.value;
        const priorityValue = priorityElement.value;
        const contentValue = contentElement.value;

        if (!isAuthorized) router.push("/login");

        showStatusPopUp(statusMessage, statusType);
        clearAddCardInputs();

        if (success) updateGroupCards(name, timestamp, id, destinationValue, priorityValue, contentValue);
    }

    function clearInputs(){
        firstInputElement.value = "";
        secondInputElement.value = "";
    }

    function clearAddCardInputs() {
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