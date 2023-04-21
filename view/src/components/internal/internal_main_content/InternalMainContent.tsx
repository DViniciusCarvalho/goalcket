import React, { useState, useContext } from "react";
import mainStyles from "@/styles/internal/main/Main.module.css";
import Personal from "./options/Personal";
import { InternalPageContext } from "@/pages/internal";
import Error from "./options/Error";
import GroupContent from "./options/GroupContent";
import GroupPopUp from "./group_popup/GroupPopUp";
import TokenIcon from "../../../../public/assets/token.png";
import LockIcon from "../../../../public/assets/lock.png";
import GroupIcon from "../../../../public/assets/group.png";
import { getCreateGroupRequestConfig } from "@/utils/requests";
import { CreateGroupRequestParameters, CreateGroupResponse } from "@/types/types";

export default function InternalMainContent(){

    const { name, personal, overlayAndPopUpVisibility, handlePopUpGroupState } = useContext(InternalPageContext);
    const { currentRoom, getGroupWithSuccess, getGroupRequestStatusMessage, groupData } = useContext(InternalPageContext);
    const { popUpType, setPopUpType } = useContext(InternalPageContext);

    const [ firstValue, setFirstValue ] = useState<string>("");
    const [ secondValue, setSecondValue ] = useState<string>("");

    function handleCreateClick() {
        if (popUpType === "join") {
            setPopUpType("create");
            clearInputs();
            return;
        }
        const requestConfig = getCreateGroupRequestConfig(name, firstValue, secondValue);
        doCreateGroupRequest(requestConfig);
    }

    async function doCreateGroupRequest(requestConfig: CreateGroupRequestParameters){
        const response = await fetch("http://localhost:3001/create-group", requestConfig);
        const responseStringfied = await response.json();
        const responseObject: CreateGroupResponse = JSON.parse(responseStringfied);
        handleCreateGroupResponse(responseObject);
    }

    function handleCreateGroupResponse(response: CreateGroupResponse) {
        if (response.status === 200){
            console.log(response.hash);
        }
        else if (response.status === 403){
            console.log("Vai pra tela inicial");
        }
        else if (response.status === 500){
            console.log("Deu merda paizao");
        }
    }

    function handleJoinClick() {
        if (popUpType === "create") {
            setPopUpType("join");
            clearInputs();
            return;
        }
        console.log("pode mandar a req pro join");
    }

    async function doJoinGroupRequest(){

    }

    function handleJoinGroupResponse(){
        
    }

    function clearInputs(){
        setFirstValue("");
        setSecondValue("");
    }

    function changeFirstInput(value: string){
        setFirstValue(value);
    }

    function changeSecondInput(value: string){
        setSecondValue(value);
    }
    
    const commonProps = {
        popUpType: popUpType,
        handlePopUpGroupState: handlePopUpGroupState,
        changeFirstInput: changeFirstInput,
        changeSecondInput: changeSecondInput,
        handleJoinClick: handleJoinClick,
        handleCreateClick: handleCreateClick,
        firstValue: firstValue,
        secondValue: secondValue
    };

    const joinGroupProps = {
        firstImage: TokenIcon,
        secondImage: LockIcon,
        firstLabelMessage: "Group token:",
        secondLabelMessage: "Group password:",
        ...commonProps
    };

    const createGroupProps = {
        firstImage: GroupIcon,
        secondImage: LockIcon,
        firstLabelMessage: "Group name:",
        secondLabelMessage: "Group password:",
        ...commonProps
    };

    const personalProps = { ...personal };
    const groupContentProps = { ...groupData };
    const errorProps = { getGroupRequestStatusMessage: getGroupRequestStatusMessage };

    return (
        <main className={mainStyles.main__area}>
            <div className={`${mainStyles.pop__up__container} ${mainStyles[overlayAndPopUpVisibility]}`}>
                { popUpType === "join"? <GroupPopUp {...joinGroupProps}/> : <GroupPopUp {...createGroupProps}/>}
            </div>
            { currentRoom === "personal"? <Personal {...personalProps}/> : (
                getGroupWithSuccess ? (<GroupContent {...groupContentProps}/>) : (<Error {...errorProps}/>)
            )}
        </main>
    );
}