import React, { useContext, useEffect, useState } from "react";
import GroupOption from "@/components/internal/header/GroupOption";
import headerStyles from "@/styles/internal/header/InternalHeader.module.css";
import { InternalPageContext } from "@/pages/internal";
import { Data } from "@/types/data";

export default function InternalHeader(){

    const { username, groups, changePopUpToVisible, handleChangeRoom } = useContext(InternalPageContext);

    const [ userGroups, setUserGroups ] = useState<Data.IGroup[]>([]);

    useEffect(() => {
        getUserGroups();
    }, [groups]);

    function getUserGroups(){
        setUserGroups(groups);
    }

    function changeRoom(event: React.ChangeEvent<HTMLSelectElement>){
        const selectedIndex = event.target!.selectedIndex;
        const selectedOption = event.target!.options[selectedIndex];
        const selectedOptionId = selectedOption.id;
        handleChangeRoom(selectedOptionId);
    }

    return (
        <header className={headerStyles.internal__header}>
            <div className={headerStyles.user__area}>
                Hi, {username}!
            </div>
            <div className={headerStyles.nav__area}>
                <select onChange={changeRoom} className={headerStyles.group__select}>
                    <option value="personal" id="personal"> Personal </option>
                    {userGroups.length && (userGroups.map(group => (
                        <React.Fragment key={group.hash}>
                            <GroupOption groupName={group.name} groupHash={group.hash}/>
                        </React.Fragment>
                    )))}
                </select>
                <button className={headerStyles.join_group__button} 
                    onClick={() => changePopUpToVisible("createJoinGroup")}
                >
                    Join group
                </button>
            </div>
        </header>
    );
}
