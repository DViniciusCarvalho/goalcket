import React from "react";
import statusPopUpstyle from "@/styles/common/popups/StatusPopUp.module.css";
import ErrorIcon from "../../../../public/assets/warning.png";
import SuccessIcon from "../../../../public/assets/successful.png";
import Image from "next/image";
import { Props } from "@/types/props";
 

export default function StatusPopUp({ content, visibilityClass, status }: Props.StatusPopUpProps) {

    const popUpMessages: {[key: string]: string} = {
        invalidLogin: "Invalid credentials, password or e-mail incorrect.",
        invalidInput: "Invalid credentials, don't use HTML tags and emails must have \"@\".",
        invalidUser: "E-mail already used. Please, try to use another one.",
        successfulLogon: "Registered with success.",
        serverError: "An error occurred. Please try again later.",
        groupCreated: "Created with success.",
        joinedGroup: "Joined with success.",
        invalidGroupData: "Invalid data. HTML tags are not allowed and please follow the patterns.",
        groupNotFound: "Group not found.",
        alreadyInGroup: "You are already in this group.",
        addCardWithSuccess: "Successful operation.",
        deletedWithSuccess: "Deleted with success.",
        cardNotFound: "Card not found.",
        noColumnSpecified: "The destination column must be selected.",
        movedWithSuccess: "Moved with success.",
        kickedWithSuccess: "User kicked with success.",
        notAdmin: "Just administrators can do this.",
        exitWithSuccess: "Successful exit.",
        uniqueAdmin: "You are the unique admin here. Give to someone the admin privilege before.",
        promotedWithSuccess: "Member promoted with success."
    };

    return (
        <div className={`${statusPopUpstyle.pop__up__box} ${statusPopUpstyle[visibilityClass]} 
            ${statusPopUpstyle[status]}`}
        >
            <Image src={(status === "error")? ErrorIcon : SuccessIcon } 
                alt="status icon" className={statusPopUpstyle.status__icon}/>
            <p> { popUpMessages[content] } </p>
        </div>
    );
}
