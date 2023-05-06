import React, { useContext } from "react";
import memberInfoPopUpStyle from "@/styles/common/popups/MemberInfoPopUp.module.css";
import Profile from "../../../../public/assets/profile.png";
import { InternalPageContext } from "@/pages/internal";
import Image from "next/image";
import CloseButton from "../buttons/CloseButton";
import { Data } from "@/types/data";
import { Props } from "@/types/props";
import ActionButton from "../buttons/ActionButton";


export default function MemberInfoPopUp({ name, id, roles }: Data.MemberData) {

    const { 
        memberPopUpVisibility, 
        userIsAdmin, 
        hideFirstLayerOverlayAndPopUps, 
        handleKickUser,
        handlePromoteMember
    } = useContext(InternalPageContext);

    const origin = "member--info";

    const closeButtonProps: Props.ExitButtonProps = {
        origin: origin,
        actionFunction: hideFirstLayerOverlayAndPopUps
    };

    const kickButtonProps: Props.ActionButtonProps = {
        origin: origin,
        message: "Kick",
        actionFunction: () => handleKickUser(id)
    };

    const promoteButtonProps: Props.ActionButtonProps = {
        origin: origin,
        message: "Promote",
        actionFunction: () => handlePromoteMember(id)
    };

    function currentMemberIsAdmin(): boolean {
        return roles?.indexOf("admin") !== -1;
    }

    return (
        <div className={`${memberInfoPopUpStyle.member__pop__up__container} 
          ${memberInfoPopUpStyle[memberPopUpVisibility]}`} id={id}
        >
            <CloseButton {...closeButtonProps}/>
            <div className={memberInfoPopUpStyle.member__info__block}>
                <Image src={Profile} alt="user profile icon" className={memberInfoPopUpStyle.profile__icon}/>
                <div className={memberInfoPopUpStyle.member__name__and__role__block}>
                    <p className={memberInfoPopUpStyle.member__name}>
                        { name }
                    </p>
                    <p className={memberInfoPopUpStyle.member__role}>
                        { currentMemberIsAdmin()? "Administrator" : "Member" }
                    </p>
                </div>
            </div>
            { userIsAdmin && !currentMemberIsAdmin() && (
                <div className={memberInfoPopUpStyle.buttons__block}>
                    <ActionButton {...kickButtonProps}/>
                    <ActionButton {...promoteButtonProps}/>
                </div>
            )}
        </div>
    );
}
