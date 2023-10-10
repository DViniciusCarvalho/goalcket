import React, { useContext } from "react";
import groupInfoPopUpStyle from "@/styles/common/popups/GroupInfoPopUp.module.css";
import { InternalPageContext } from "@/pages/internal";
import CloseButton from "../buttons/CloseButton";
import { Data } from "@/types/data";
import { Props } from "@/types/props";
import { formatDate, getAdminsNumber } from "@/lib/utils";
import ActionButton from "../buttons/ActionButton";

export default function GroupInfoPopUp({ 
    name, 
    creation, 
    members, 
    columns 
}: Data.GroupData) {

    const { 
        groupInfoPopUpVisibility, 
        hideFirstLayerOverlayAndPopUps, 
        userIsAdmin, 
        handleLeaveGroup,
        handleDeleteGroup
    } = useContext(InternalPageContext);


    const ORIGIN = "group--info";


    const closeButtonProps: Props.ExitButtonProps = {
        origin: ORIGIN,
        actionFunction: hideFirstLayerOverlayAndPopUps
    };

    const leaveGroupButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: "Leave group",
        actionFunction: handleLeaveGroup
    };

    const deleteGroupButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: "Delete group",
        actionFunction: handleDeleteGroup
    };


    return (
        <div 
            className={`
                ${groupInfoPopUpStyle.group__info__pop__up__container} 
                ${groupInfoPopUpStyle[groupInfoPopUpVisibility]}
                `
            }
        >
            <CloseButton {...closeButtonProps}/>
            <div className={groupInfoPopUpStyle.group__info__wrapper}>
                <div className={groupInfoPopUpStyle.group__name}>
                    <p className={groupInfoPopUpStyle.label}>
                        Group name:
                    </p>
                    <p className={groupInfoPopUpStyle.data}>
                        {name}
                    </p>
                </div>
                <div className={groupInfoPopUpStyle.group__creation}>
                    <p className={groupInfoPopUpStyle.label}>Created in:</p>
                    <p className={groupInfoPopUpStyle.data}>
                        {formatDate(Number(creation))}
                    </p>
                </div>
                <div className={groupInfoPopUpStyle.group__participants__number}>
                    <p className={groupInfoPopUpStyle.label}>
                        Participants:
                    </p>
                    <p className={groupInfoPopUpStyle.data}>
                        {members.length}
                    </p>
                </div>
                <div className={groupInfoPopUpStyle.group__administrators__number}>
                    <p className={groupInfoPopUpStyle.label}>
                        Administrators:
                    </p>
                    <p className={groupInfoPopUpStyle.data}>
                        {getAdminsNumber(members)}
                    </p>
                </div>
            </div>
            <div className={groupInfoPopUpStyle.buttons__wrapper}>
                <ActionButton {...leaveGroupButtonProps}/>
                {userIsAdmin && (
                    <ActionButton {...deleteGroupButtonProps}/>
                )}
            </div>
        </div>
    );
}
