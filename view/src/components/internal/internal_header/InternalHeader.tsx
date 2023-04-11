import React, { useContext, useEffect, useState } from "react";
import Group from "./Group";
import headerStyles from "@/styles/internal/header/Header.module.css";
import { InternalPageContext } from "@/pages/internal";
import { IGroup } from "@/types/types";

export default function InternalHeader(){

    const context = useContext(InternalPageContext);

    const [ groups, setGroups ] = useState<IGroup[]>([]);

    useEffect(() => {
        getUserGroups();
    }, [context]);

    function getUserGroups(){
        setGroups(context.groups);
    }

    function changeGroup(event: React.ChangeEvent<HTMLSelectElement>){
        const value = event.target!.value;
        console.log(value);
    }

    return (
        <header className={headerStyles.internal__header}>
            <div className={headerStyles.user__area}>
                Hi, {context.name}!
            </div>
            <div className={headerStyles.nav__area}>
                <select onChange={changeGroup} className={headerStyles.group__select}>
                    <option value="personal"> Personal </option>
                    {groups && (groups.map((group, index) => (
                        <React.Fragment key={index}>
                            <Group groupName={group.name} groupHash={group.hash}/>
                        </React.Fragment>
                    )))}
                </select>
                <button className={headerStyles.join_group__button}>Join group</button>
            </div>
        </header>
    );
}
