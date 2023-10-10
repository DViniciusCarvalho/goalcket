import React, { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

import internalStyles from '@/styles/internal/Internal.module.css';

import FirstLayerOverlay from '@/components/common/overlay/FirstLayerOverlay';
import SecondLayerOverlay from '@/components/common/overlay/SecondLayerOverlay';
import InternalHeader from '@/components/internal/header/InternalHeader';
import InternalMainContent from '@/components/internal/main/InternalMainContent';

import { delay } from '@/lib/utils';

import {  
    getAppropriatePopUpsVisibility, 
    getAppropriateBigCardOptionPopUpsVisibility,
} from '@/lib/popUpVisibility';

import { fetchUserInitialData } from '@/actions/fetchInitialData';

import { 
    getGroupContent, 
    getAppropriateGetGroupStatusMessage 
} from '@/actions/getGroupContent';

import { 
    deletePersonalCard, 
    getPersonalDataWithoutDeletedCard, 
    getAppropriateDeletePersonalCardStatusMessage 
} from '@/actions/deletePersonalCard';

import { 
    deleteGroupCard, 
    getGroupDataWithoutDeletedCard, 
    getAppropriateDeleteGroupCardStatusMessage 
} from '@/actions/deleteGroupCard';

import { 
    getPersonalDataWithMovedCard, 
    movePersonalCard, 
    getAppropriateMovePersonalCardStatusMessage 
} from '@/actions/movePersonalCard';

import { 
    getGroupDataWithMovedCard, 
    moveGroupCard, 
    getAppropriateMoveGroupCardStatusMessage 
} from '@/actions/moveGroupCard';

import { 
    changePersonalCardContent, 
    getPersonalDataWithModifiedCardContent 
} from '@/actions/changePersonalCardContent';

import { 
    changeGroupCardContent, 
    getGroupDataWithModifiedCard 
} from '@/actions/changeGroupCardContent';

import {
    leaveGroup,
    getAppropriateLeaveGroupStatusMessage,
    getUpdatedGroupOptionsList
} from '@/actions/leaveGroup';

import { 
    getAppropriateKickUserStatusMessage, 
    getGroupDataWithoutKickedUser, 
    kickUser 
} from '@/actions/kickUserFromGroup';

import { 
    deleteGroup, 
    getAppropriateDeleteGroupStatusMessage 
} from '@/actions/deleteGroup';

import { 
    getAppropriatePromoteMemberStatusMessage, 
    promoteMember, 
    getGroupDataWithMemberRoleUpdated 
} from '@/actions/promoteMembers';

import { Data } from '@/types/data';


export const InternalPageContext = createContext<any>(null);


export default function Internal(){

    const router = useRouter();


    const [ 
        username, 
        setUsername 
    ] = useState('');

    const [ 
        userId, 
        setUserId 
    ] = useState('');

    const [ 
        userIsAdmin, 
        setUserIsAdmin 
    ] = useState(false);

    const [ 
        personal, 
        setPersonal 
    ] = useState<Data.PersonalDataState>(null);

    const [ 
        groups, 
        setGroups 
    ] = useState<Data.GroupOptionDataList>(null);

    const [ 
        loaded, 
        setLoaded 
    ] = useState(false);
    
    const [ 
        currentRoom, 
        setCurrentRoom 
    ] = useState('personal');

    const [ 
        groupData, 
        setGroupData 
    ] = useState<Data.GroupDataState>(null);

    const [ 
        getGroupWithSuccess, 
        setGetGroupWithSuccess 
    ] = useState(false);

    const [ 
        getGroupRequestStatusMessage, 
        setGetGroupRequestStatusMessage 
    ] = useState('notFound');

    const [ 
        currentGroupId, 
        setCurrentGroupId 
    ] = useState('');

    const [ 
        popUpType, 
        setPopUpType 
    ] = useState('join');

    const [ 
        okToLoad, 
        setOkToLoad 
    ] = useState(false);

    const [ 
        firstLayerOverlayVisibility, 
        setFirstLayerOverlayVisibility 
    ] = useState('invisible');

    const [ 
        secondLayerOverlayVisibility, 
        setSecondLayerOverlayVisibility 
    ] = useState('invisible');

    const [ 
        popUpStatusVisibility, 
        setPopUpStatusVisibility 
    ] = useState('invisible');

    const [ 
        popUpStatusContent, 
        setpopUpStatusContent 
    ] = useState('serverError');

    const [ 
        popUpStatusType, 
        setPopUpStatusType 
    ] = useState('error');

    const [ 
        createJoinGroupPopUpVisibility, 
        setCreateJoinGroupPopUpVisibility 
    ] = useState('invisible');

    const [ 
        addCardPopUpVisibility, 
        setAddCardPopUpVisibility 
    ] = useState('invisible');

    const [ 
        bigCardPopUpVisibility, 
        setBigCardPopUpVisibility 
    ] = useState('invisible');

    const [ 
        deleteCardPopUpVisibility, 
        setDeleteCardPopUpVisibility 
    ] = useState('invisible');

    const [ 
        moveCardPopUpVisibility, 
        setMoveCardPopUpVisibility 
    ] = useState('invisible');

    const [ 
        memberPopUpVisibility, 
        setMemberPopUpVisibility 
    ] = useState('invisible');

    const [ 
        groupInfoPopUpVisibility, 
        setGroupInfoPopUpVisibility 
    ] = useState('invisible');

    const [ 
        currentColumn, 
        setCurrentColumn 
    ] = useState('todo');

    const [ 
        currentCardIdToDelete, 
        setCurrentCardIdToDelete 
    ] = useState('');

    const [ 
        currentCardDataToMove, 
        setCurrentCardDataToMove 
    ] = useState({});

    const [ 
        currentMemberData, 
        setCurrentMemberData 
    ] = useState<Data.MemberData>({
        name: '',
        id: '',
        roles: []
    });


    const contextValues = {
        username,
        userId,
        personal,
        groups,
        addCardPopUpVisibility,
        bigCardPopUpVisibility,
        createJoinGroupPopUpVisibility,
        deleteCardPopUpVisibility,
        moveCardPopUpVisibility,
        memberPopUpVisibility,
        groupInfoPopUpVisibility,
        changePopUpToVisible,
        hideFirstLayerOverlayAndPopUps,
        handleDeleteCardPopUpState, 
        handleMoveCardPopUpState,
        openMemberInfo,
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
        currentColumn,
        currentMemberData,
        userIsAdmin,
        handleKickUser,
        openGroupSettings,
        handleLeaveGroup,
        removeGroupFromGroupOptionList,
        handleDeleteGroup,
        handlePromoteMember
    };


    const firstLayerOverlayProps = {
        visibility: firstLayerOverlayVisibility,
        hideFirstLayerOverlayAndPopUps
    };

    const secondLayerOverlayProps = {
        visibility: secondLayerOverlayVisibility,
        hideSecondLayerOverlayAndBigCardOptionPopUps,
    }


    let alreadyLoaded = false;

    useEffect(() => {
        if (!alreadyLoaded) {
            handleClientEntry();
        }
        alreadyLoaded = true;
    }, []);


    async function handleClientEntry(): Promise<void> {
        
        const {
            status,
            responseObject
        } = await fetchUserInitialData();

        const { 
            name, 
            userId, 
            rooms 
        } = responseObject;
        
        if (status === 200) {
            const personalData = rooms.personal;
            const userGroups = rooms.groups;
            
            setUsername(previous => name);
            setUserId(previous => userId);
            setPersonal(previous => personalData);
            setGroups(previous => userGroups);
            setLoaded(previous => true);
        }
        else {
            router.push('/login');
        }
    }


    function handleChangeRoom(
        roomId: string
    ): void {

        setCurrentRoom(() => roomId);
        
        if (roomId !== 'personal') {
            setCurrentGroupId(() => roomId);
            handleGetGroupContent(roomId);
        }
    }


    async function handleGetGroupContent(
        roomId: string
    ): Promise<void> {

        const { 
            status, 
            responseObject 
        } = await getGroupContent(roomId);

        const { 
            group, 
            isAdmin 
        } = responseObject;

        const { 
            statusMessage, 
            success, 
            canLoadData,
            groupExists 
        } = getAppropriateGetGroupStatusMessage(status);

        if (success && canLoadData) {
            loadGroupData(group);
            setUserIsAdmin(previous => isAdmin);
        }
        else if (!groupExists) {
            removeGroupFromGroupOptionList();
        }
        
        setGetGroupRequestStatusMessage(previous => statusMessage);
        setGetGroupWithSuccess(previous => success);
    }


    async function loadGroupData(
        groupData: Data.GroupData
    ): Promise<void> {

        setOkToLoad(previous => false);

        await delay(1);

        setOkToLoad(previous => true);
        setGroupData(previous => groupData);
    }


    function updateOptions(
        name: string, 
        hash: string
    ): void {

        setGroups(previous => [
            ...previous as Array<Data.GroupOptionData>, 
            { 
                name, 
                hash
            }
        ]);
    }


    function updatePersonalCards(
        name: string, 
        timestamp: number, 
        id: string, 
        destinationValue: string, 
        priorityValue: string, 
        contentValue: string
    ): void {

        const newCard: Data.CardData = {
            content: contentValue,
            priority: priorityValue,
            timestamp: timestamp,
            id: id,
            creator: {
                name: name,
                roles: [ 'admin' ]
            }
        };

        setPersonal(previous => {
            const deepCopy: Data.PersonalData = JSON.parse(JSON.stringify(previous));

            deepCopy![destinationValue].cards.push(newCard);

            return deepCopy;
        });

        hideFirstLayerOverlayAndPopUps();
    }


    function updateGroupCards(
        name: string, 
        timestamp: number, 
        id: string, 
        destinationValue: string, 
        priorityValue: string, 
        contentValue: string
    ): void {

        const newCard: Data.CardData = {
            content: contentValue,
            priority: priorityValue,
            timestamp: timestamp,
            id: id,
            creator: {
                name: name,
                roles: [ 'admin' ]
            }
        };

        setGroupData(previous => {
            const deepCopy: Data.GroupData = JSON.parse(JSON.stringify(previous));

            deepCopy.columns![destinationValue].cards.push(newCard);

            return deepCopy;
        });   

        hideFirstLayerOverlayAndPopUps();
    }


    function handleDeleteCard(): void {
        if (currentRoom === 'personal') {
            handleDeletePersonalCard();
        }
        else {
            handleDeleteGroupCard();
        }
    }


    async function handleDeletePersonalCard(): Promise<void> {

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
            router.push('/login');
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success) {
                removeCardFromPersonalDOM();
            }
        }
    }


    function removeCardFromPersonalDOM(): void {

        const personalData = personal as Data.PersonalData;

        const personalCardsWithoutDeleteCard = getPersonalDataWithoutDeletedCard(
            personalData, 
            currentColumn
        );

        setPersonal(previous => personalCardsWithoutDeleteCard);
        hideFirstLayerOverlayAndPopUps();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }


    async function handleDeleteGroupCard(): Promise<void> {

        const status = await deleteGroupCard(
            currentGroupId, 
            currentColumn, 
            currentCardIdToDelete
        );

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized,
            groupExists
        } = getAppropriateDeleteGroupCardStatusMessage(status);

        if (!isAuthorized) {
            router.push('/login');
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success) {
                removeCardFromGroupDOM();
            }
            else if (!groupExists) {
                removeGroupFromGroupOptionList();
            }
        }
    }


    function removeCardFromGroupDOM(): void {

        const groupCardsWithoutDeleteCard = getGroupDataWithoutDeletedCard(
            groupData as Data.GroupData, 
            currentColumn
        );

        setGroupData(previous => groupCardsWithoutDeleteCard);
        hideFirstLayerOverlayAndPopUps();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }


    function handleMoveCard(
        destinyColumn: string
    ): void {

        if (currentRoom === 'personal') {
            handleMovePersonalCard(destinyColumn);
        }
        else {
            handleMoveGroupCard(destinyColumn);
        }
    }


    async function handleMovePersonalCard(
        destinyColumn: string
    ): Promise<void> {

        const { 
            status, 
            responseObject 
        } = await movePersonalCard(
            currentCardDataToMove as Data.CardData, 
            currentColumn, 
            destinyColumn
        );

        const {
            hash 
        } = responseObject;

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized
        } = getAppropriateMovePersonalCardStatusMessage(status);

        if (!isAuthorized) {
            router.push('/login');
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success) {
                moveCardFromPersonalDOM(destinyColumn, hash);
            }
        }
    }


    function moveCardFromPersonalDOM(
        destinyColumn: string, 
        newHash: string
    ): void {

        const personalData = personal as Data.PersonalData;

        const personalCardsWithoutDeleteCard = getPersonalDataWithMovedCard(
            personalData, 
            currentCardDataToMove as Data.CardData, 
            currentColumn,
            destinyColumn,
            newHash
        );

        setPersonal(previous => personalCardsWithoutDeleteCard);
        hideFirstLayerOverlayAndPopUps();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }


    async function handleMoveGroupCard(
        destinyColumn: string
    ): Promise<void> {

        const { 
            status, 
            responseObject 
        } = await moveGroupCard(
            currentRoom, 
            currentCardDataToMove as Data.CardData, 
            currentColumn, 
            destinyColumn
        );
        
        const {
            hash 
        } = responseObject;

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized,
            groupExists
        } = getAppropriateMoveGroupCardStatusMessage(status);

        if (!isAuthorized) {
            router.push('/login');
        }
        else {
            showStatusPopUp(statusMessage, statusType);

            if (success) {
                moveCardFromGroupDOM(destinyColumn, hash);
            }
            else if (!groupExists) {
                removeGroupFromGroupOptionList();
            }
        }
    }


    function  moveCardFromGroupDOM(
        destinyColumn: string, 
        newHash: string
    ): void {

        const groupCardsWithMovedCard = getGroupDataWithMovedCard(
            groupData as Data.GroupData, 
            currentCardIdToDelete,
            currentCardDataToMove as Data.CardData, 
            currentColumn,
            destinyColumn,
            newHash
        );

        setGroupData(previous => groupCardsWithMovedCard);
        hideFirstLayerOverlayAndPopUps();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }


    function handleSaveCard(
        id: string, 
        column: string, 
        oldContent: string, 
        newContent: string
    ): void {

        if (oldContent === newContent) {
            return;
        }
        else if (currentRoom === 'personal') {
            handleChangePersonalCardContent(id, column, newContent);
        }
        else {
            handleChangeGroupCardContent(currentRoom, id, column, newContent);
        }
    }


    async function handleChangePersonalCardContent(
        cardId: string, 
        currentColumn: string, 
        newContent: string
    ): Promise<void> {

        const status = await changePersonalCardContent(
            cardId, 
            currentColumn, 
            newContent
        );

        if (status === 200) {
            updatePersonalCardContentInTheDOM(
                cardId, 
                currentColumn, 
                newContent
            );
        }
    }


    function updatePersonalCardContentInTheDOM(
        cardId: string, 
        currentColumn: string, 
        newContent: string
    ): void {

        const personalDataWithModifiedCard = getPersonalDataWithModifiedCardContent(
            personal as Data.PersonalData,
            cardId, 
            currentColumn,
            newContent
        );

        setPersonal(() => personalDataWithModifiedCard);
    }


    async function handleChangeGroupCardContent(
        groupId: string, 
        cardId: string, 
        currentColumn: string, 
        currentContent: string
    ): Promise<void> {

        const status = await changeGroupCardContent(
            groupId, 
            cardId, 
            currentColumn, 
            currentContent
        );

        if (status === 200) {
            updateGroupCardContentInTheDOM(
                groupData, 
                currentColumn, 
                cardId, 
                currentContent
            );
        }
    }


    function updateGroupCardContentInTheDOM(
        groupData: Data.GroupDataState, 
        currentColumn: string, 
        cardId: string, 
        newContent: string
    ): void {

        const groupDataWithModifiedCard = getGroupDataWithModifiedCard(
            groupData as Data.GroupData,
            currentColumn,
            cardId,
            newContent
        );

        setGroupData(() => groupDataWithModifiedCard);
    }


    async function handleKickUser(
        userIdToKick: string
    ): Promise<void> {

        const status = await kickUser(
            currentGroupId, 
            userIdToKick
        );

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized,
            groupExists
        } = getAppropriateKickUserStatusMessage(status);

        if (!isAuthorized) {
            router.push('/login');
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success) {
                removeMemberFromDOM(userIdToKick);
            }
            else if (!groupExists) {
                removeGroupFromGroupOptionList();
            }
        }
    }


    function removeMemberFromDOM(
        userIdToKick: string
    ): void {

        const groupDataWithoutKickedUser = getGroupDataWithoutKickedUser(
            groupData as Data.GroupData, 
            userIdToKick
        );

        setGroupData(() => groupDataWithoutKickedUser);
    }


    async function handleLeaveGroup(): Promise<void> {

        const status = await leaveGroup(currentGroupId);

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized,
            groupExists
        } = getAppropriateLeaveGroupStatusMessage(status);

        if (!isAuthorized) {
            router.push('/login');
        }
        else {
            showStatusPopUp(statusMessage, statusType);
            if (success || !groupExists) {
                removeGroupFromGroupOptionList();
            }
        }
    }


    async function handleDeleteGroup(): Promise<void> {

        const status = await deleteGroup(currentGroupId);

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized,
            groupExists
        } = getAppropriateDeleteGroupStatusMessage(status);

        if (!isAuthorized) {
            router.push('/login');
        }
        else {
            showStatusPopUp(statusMessage, statusType);

            if (success || !groupExists) {
                removeGroupFromGroupOptionList();
            }
        }
    }


    async function handlePromoteMember(
        userIdToPromote: string
    ): Promise<void> {

        const status = await promoteMember(
            currentGroupId, 
            userIdToPromote
        );

        const { 
            statusMessage, 
            statusType, 
            success, 
            isAuthorized,
            groupExists
        } = getAppropriatePromoteMemberStatusMessage(status);

        if (!isAuthorized) {
            router.push('/login');
        }
        else {
            showStatusPopUp(statusMessage, statusType);

            if (success) {
                promoteUserToAdminInTheDOM(userIdToPromote);
            }
            else if (!groupExists) {
                removeGroupFromGroupOptionList();
            }
        }
    }


    function handleDeleteCardPopUpState(
        id: string, 
        column: string
    ): void {

        setCurrentCardIdToDelete(() => id);
        setCurrentColumn(() => column);
        changeBigCardOptionPopUpToVisible('deleteCard');
    }


    function handleMoveCardPopUpState(
        content: string, 
        priority: string, 
        timestamp: number, 
        id: string, 
        creator: Data.MemberData, 
        column: string
    ): void {

        const currentCardDataToMove = {
            content: content, 
            priority: priority, 
            timestamp: timestamp, 
            id: id, 
            creator: creator
        };

        setCurrentCardDataToMove(() => currentCardDataToMove);
        setCurrentColumn(() => column);
        changeBigCardOptionPopUpToVisible('moveCard');
    }


    async function showStatusPopUp(
        statusMessage: string, 
        statusType: string
    ){

        setpopUpStatusContent(() => statusMessage);
        setPopUpStatusType(() => statusType);
        setPopUpStatusVisibility(() => 'visible');
        await delay(4000);
        setPopUpStatusVisibility(() => 'invisible');
    }


    function hideFirstLayerOverlayAndPopUps(): void {

        setFirstLayerOverlayVisibility(() => 'invisible');
        hideAllPopUps();
    }


    function changePopUpToVisible(
        identifierString: string
    ): void {

        const { 
            createJoinGroupVisibility, 
            addCardVisibility, 
            bigCardVisibility,
            memberInfoVisibility,
            groupInfoVisibility
        } = getAppropriatePopUpsVisibility(identifierString);

        setPopUpType(() => 'join');
        setCreateJoinGroupPopUpVisibility(() => createJoinGroupVisibility);
        setAddCardPopUpVisibility(() => addCardVisibility);
        setBigCardPopUpVisibility(() => bigCardVisibility);
        setMemberPopUpVisibility(() => memberInfoVisibility);
        setGroupInfoPopUpVisibility(() => groupInfoVisibility);
        setFirstLayerOverlayVisibility(() => 'visible');
    }


    function hideAllPopUps(): void {

        setCreateJoinGroupPopUpVisibility(() => 'invisible');
        setAddCardPopUpVisibility(() => 'invisible');
        setBigCardPopUpVisibility(() => 'invisible');
        setMemberPopUpVisibility(() => 'invisible');
        setGroupInfoPopUpVisibility(() =>'invisible');
    }


    function hideSecondLayerOverlayAndBigCardOptionPopUps(): void {
        setSecondLayerOverlayVisibility(() => 'invisible');
        hideAllBigCardOptionPopUps();
    }


    function changeBigCardOptionPopUpToVisible(
        identifierString: string
    ): void {

        const { 
            deleteCardVisibility, 
            moveCardVisibility 
        } = getAppropriateBigCardOptionPopUpsVisibility(identifierString);

        setDeleteCardPopUpVisibility(() => deleteCardVisibility);
        setMoveCardPopUpVisibility(() => moveCardVisibility);
        setSecondLayerOverlayVisibility(() => 'visible');
    }


    function hideAllBigCardOptionPopUps(): void {
        setDeleteCardPopUpVisibility(() => 'invisible');
        setMoveCardPopUpVisibility(() => 'invisible');
    }


    function openMemberInfo(
        name: string, 
        id: string, 
        roles: string[]
    ) {

        setCurrentMemberData(() => { 
            return {
                name: name,
                id: id,
                roles: roles
            }
        });
        changePopUpToVisible('memberInfo');
    }


    function openGroupSettings(): void {
        changePopUpToVisible('groupInfo');
    }


    function removeGroupFromGroupOptionList(): void {
        const groupOptionsListUpdated = getUpdatedGroupOptionsList(
            groups as Data.GroupOptionData[], 
            currentGroupId
        );
        setGroups(() => groupOptionsListUpdated);
        hideFirstLayerOverlayAndPopUps();
        setCurrentRoom(() => 'personal');
    }


    function promoteUserToAdminInTheDOM(
        userIdToPromote: string
    ): void {

        const groupDataWithUpdatedMemberRoles = getGroupDataWithMemberRoleUpdated(
            groupData as Data.GroupData,
            userIdToPromote
        );
        
        setGroupData(() => groupDataWithUpdatedMemberRoles);
        setCurrentMemberData(previous => {
            const deepCopy = JSON.parse(JSON.stringify(previous));
            deepCopy.roles.push('admin');
            return deepCopy;
        });
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