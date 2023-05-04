import React, { useContext } from "react";

import groupContentStyle from "@/styles/internal/main/content/GroupContent.module.css";
import mainStyles from "@/styles/internal/main/Main.module.css";

import SettingsIcon from "../../../../../public/assets/settings.png";

import Image from "next/image";
import Member from "@/components/internal/main/card/Member";
import ToDo from "@/components/internal/main/columns/ToDo";
import Doing from "@/components/internal/main/columns/Doing";
import Done from "@/components/internal/main/columns/Done";
import Functionalities from "@/components/internal/main/functionalities/Functionalities";

import { Data } from "@/types/data";
import { Props } from "@/types/props";
import MemberInfoPopUp from "@/components/common/popups/MemberInfoPopUp";
import { InternalPageContext } from "@/pages/internal";
import GroupInfoPopUp from "@/components/common/popups/GroupInfoPopUp";


export default function GroupContent({ name, members, columns }: Props.GroupContentProps){
    
    const { currentMemberData, openGroupSettings } = useContext(InternalPageContext);

    const memberInfoPopUpProps: Data.MemberData = {
        name: currentMemberData.name,
        id: currentMemberData.id,
        roles: currentMemberData.roles
    };

    const toDoProps = { 
        ...columns.todo, 
        isGroup: true 
    };

    const doingProps = { 
        ...columns.doing, 
        isGroup: true 
    };
    
    const doneProps = { 
        ...columns.done, 
        isGroup: true 
    };

    return (
        <div className={groupContentStyle.group__area__block}>
            <MemberInfoPopUp {...memberInfoPopUpProps}/>
            <GroupInfoPopUp/>
            <div className={groupContentStyle.group__info__wrapper}>
                <div className={groupContentStyle.group__members__block}>
                    { members.map(member => (
                        <Member key={member.id} name={member.name} id={member.id} roles={member.roles}/>
                    ))}
                </div>
                <button className={groupContentStyle.group__settings__button} onClick={() => openGroupSettings(name, members, columns)}>
                    <Image src={SettingsIcon} alt="settings icon" className={groupContentStyle.settings__icon}/>
                </button>
            </div>
            <div className={groupContentStyle.group__content__block}>
                <div className={mainStyles.columns__wrapper}>
                    <ToDo {...toDoProps}/>
                    <Doing {...doingProps}/>
                    <Done {...doneProps}/>
                </div>
                <Functionalities isGroup={true}/>
            </div>
        </div>
    );
}