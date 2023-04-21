import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import Overlay from "@/components/common/overlay/Overlay";
import InternalHeader from "@/components/internal/header/InternalHeader";
import InternalMainContent from "@/components/internal/internal_main_content/InternalMainContent";
import internalStyles from "@/styles/internal/Internal.module.css";
import { FetchDataRequestParameters, FetchDataResponse, IPersonal, IGroup, GetGroupContentResponse } from "@/types/types";
import { GetGroupContentRequestParameters } from "@/types/types";
import { getFetchDataRequestConfig, getGroupContentRequestConfig } from "@/utils/requests";

export const InternalPageContext = createContext<any>(null);

export default function Internal(){

    const router = useRouter();

    const [ name, setName ] = useState<string>("");
    const [ personal, setPersonal ] = useState<null | IPersonal>(null);
    const [ groups, setGroups ] = useState<null | IGroup[]>(null);
    const [ loaded, setLoaded ] = useState(false);
    const [ overlayAndPopUpVisibility, setOverlayAndPopUpVisibility ] = useState<"visible" | "invisible">("invisible");
    const [ currentRoom, setCurrentRoom ] = useState<string>("personal");
    const [ groupData, setGroupData ] = useState({});
    const [ getGroupWithSuccess, setGetGroupWithSuccess ] = useState(false);
    const [ getGroupRequestStatusMessage, setGetGroupRequestStatusMessage ] = useState("notFound");
    const [ currentGroupId, setCurrentGroupId ] = useState("");
    const [ popUpType, setPopUpType ] = useState<"join" | "create">("join");

    const contextValues = {
        name: name,
        personal: personal,
        groups: groups,
        handlePopUpGroupState: handlePopUpGroupState,
        overlayAndPopUpVisibility: overlayAndPopUpVisibility,
        handleChangeRoom: handleChangeRoom,
        currentRoom: currentRoom,
        groupData: groupData,
        getGroupWithSuccess: getGroupWithSuccess,
        getGroupRequestStatusMessage: getGroupRequestStatusMessage,
        currentGroupId: currentGroupId,
        popUpType: popUpType,
        setPopUpType: setPopUpType
    };

    const overlayProps = {
        handlePopUpGroupState: handlePopUpGroupState,
        visibility: overlayAndPopUpVisibility
    };

    let alreadyReloaded = false;

    useEffect(() => {
        if (!alreadyReloaded){
            alreadyReloaded = true; 
            handleClientEntry();
        }
    }, []);

    function handleClientEntry(): void {
        const requestConfig = getFetchDataRequestConfig();
        doFetchDataRequest(requestConfig);
    }

    async function doFetchDataRequest(requestConfig: FetchDataRequestParameters) {
        const response = await fetch("http://localhost:3001/internal-page", requestConfig);
        const responseStringfied = await response.json();
        const responseObject: FetchDataResponse = JSON.parse(responseStringfied);
        console.log(responseObject)
        handleFetchDataResponse(responseObject);
    }

    function handleFetchDataResponse(response: FetchDataResponse): void {
        if (response.status === 200){
            setName(response.name);
            setPersonal(response.rooms.personal);
            setGroups(response.rooms.groups);
            setLoaded(true);
        }
        else {
            router.push("/login");
        }
    }

    function handlePopUpGroupState(){
        setPopUpType("join");
        handleJoinGroupState();
    }

    function handleJoinGroupState(){
        if (overlayAndPopUpVisibility === "invisible"){
            setOverlayAndPopUpVisibility("visible");
            return;
        }
        setOverlayAndPopUpVisibility("invisible");
    }

    function handleChangeRoom(roomId: string) {
        if (roomId === "personal"){
            setCurrentRoom("personal");
            return;
        }
        setCurrentGroupId(roomId);
        setCurrentRoom(roomId);
        getGroupContent(roomId);
    }

    function getGroupContent(roomId: string) {
        console.log(roomId)
        console.log(localStorage.getItem("token"))
        const requestConfig = getGroupContentRequestConfig(roomId);
        doGetGroupContentRequest(requestConfig);
    }

    async function doGetGroupContentRequest(requestConfig: GetGroupContentRequestParameters){
        const response = await fetch("http://localhost:3001/get-group-content", requestConfig);
        const responseStringfied = await response.json();
        const responseObject: GetGroupContentResponse = JSON.parse(responseStringfied);
        console.log(responseObject)
        handleGetGroupContentResponse(responseObject);
    }

    function handleGetGroupContentResponse(response: GetGroupContentResponse){
        if (response.status === 200){
            setGroupData(response.group);
            setGetGroupWithSuccess(false);
            setGetGroupWithSuccess(true);
        }
        else if (response.status === 404){
            setGetGroupRequestStatusMessage("notFound");
            setGetGroupWithSuccess(false);
        }
        else if (response.status === 400){
            setGetGroupRequestStatusMessage("badRequest");
            setGetGroupWithSuccess(false);
        }
        else if (response.status === 403){
            setGetGroupRequestStatusMessage("forbidden");
            setGetGroupWithSuccess(false);
        }
        else {
            setGetGroupRequestStatusMessage("internalServerError");
            setGetGroupWithSuccess(false);
        }
    }

    return (
        <div className={internalStyles.internal__background}>
            { loaded && (
                <InternalPageContext.Provider value={contextValues}>
                    <Overlay {...overlayProps}/>
                    <InternalHeader/>
                    <InternalMainContent/>
                </InternalPageContext.Provider>
            )}
        </div>
    );
}
