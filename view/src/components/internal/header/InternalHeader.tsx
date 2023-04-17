import React, { useContext, useEffect, useState } from "react";
import Group from "./Group";
import headerStyles from "@/styles/internal/header/Header.module.css";
import { InternalPageContext } from "@/pages/internal";
import { IGroup } from "@/types/types";

export default function InternalHeader(){

    const { name, groups } = useContext(InternalPageContext);

    const [ userGroups, setUserGroups ] = useState<IGroup[]>([]);

    useEffect(() => {
        getUserGroups();
    }, []);

    function getUserGroups(){
        setUserGroups(groups);
    }

    function changeGroup(event: React.ChangeEvent<HTMLSelectElement>){
        const value = event.target!.value;
        // request para o server para pegar os dados dos grupos
    }

    return (
        <header className={headerStyles.internal__header}>
            <div className={headerStyles.user__area}>
                Hi, {name}!
            </div>
            <div className={headerStyles.nav__area}>
                <select onChange={changeGroup} className={headerStyles.group__select}>
                    <option value="personal"> Personal </option>
                    {userGroups.length && (userGroups.map(group => (
                        <React.Fragment key={group.hash}>
                            <Group groupName={group.name} groupHash={group.hash}/>
                        </React.Fragment>
                    )))}
                </select>
                <button className={headerStyles.join_group__button}>Join group</button>
            </div>
        </header>
    );
}
