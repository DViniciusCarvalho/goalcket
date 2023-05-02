import React from "react";

import groupContentStyle from "@/styles/internal/main/content/GroupContent.module.css";
import mainStyles from "@/styles/internal/main/Main.module.css";

import Member from "@/components/internal/main/card/Member";
import ToDo from "@/components/internal/main/columns/ToDo";
import Doing from "@/components/internal/main/columns/Doing";
import Done from "@/components/internal/main/columns/Done";
import Functionalities from "@/components/internal/main/functionalities/Functionalities";

import { Props } from "@/types/props";


export default function GroupContent({ name, members, columns }: Props.GroupContentProps){
    
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
            <div className={groupContentStyle.group__members__block}>
                { members.map((element, index) => (
                    <Member key={index} name={element.name} roles={element.roles}/>
                ))}
            </div>
            <h1 className={groupContentStyle.group__name}>{ name }</h1>
            <div className={groupContentStyle.group__content__block}>
                <div className={mainStyles.columns__wrapper}>
                    <ToDo {...toDoProps}/>
                    <Doing {...doingProps}/>
                    <Done {...doneProps}/>
                </div>
                <Functionalities isGroup={true}/>
            </div>
        </div>
    )
}