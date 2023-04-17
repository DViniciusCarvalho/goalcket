import React from "react";
import headerStyles from "@/styles/internal/header/Header.module.css";
import { OptionProps } from "@/types/types";

export default function Group({ groupName, groupHash }: OptionProps){
    return (
        <option className={headerStyles.option} id={groupHash}>
            Group: { groupName }
        </option>
    );
}
