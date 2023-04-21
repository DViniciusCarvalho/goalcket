import React, { useContext, useEffect, useState } from "react";
import Group from "./Group";
import headerStyles from "@/styles/internal/header/Header.module.css";
import { InternalPageContext } from "@/pages/internal";
import { IGroup } from "@/types/types";

export default function InternalHeader(){

    const { name, groups, handlePopUpGroupState, handleChangeRoom } = useContext(InternalPageContext);

    const [ userGroups, setUserGroups ] = useState<IGroup[]>([]);

    useEffect(() => {
        getUserGroups();
    }, []);

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
                Hi, {name}!
            </div>
            <div className={headerStyles.nav__area}>
                <select onChange={changeRoom} className={headerStyles.group__select}>
                    <option value="personal" id="personal"> Personal </option>
                    {userGroups.length && (userGroups.map(group => (
                        <React.Fragment key={group.hash}>
                            <Group groupName={group.name} groupHash={group.hash}/>
                        </React.Fragment>
                    )))}
                </select>
                <button className={headerStyles.join_group__button} onClick={handlePopUpGroupState}>Join group</button>
            </div>
        </header>
    );
}
