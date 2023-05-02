import React from "react";
import groupOptionStyles from "@/styles/internal/header/InternalHeader.module.css";
import { Props } from "@/types/props";


export default function GroupOption({ groupName, groupHash }: Props.GroupOptionProps){

    return (
        <option className={groupOptionStyles.option} id={groupHash}>
            { groupName }
        </option>
    );
}
