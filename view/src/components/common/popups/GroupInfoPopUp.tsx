import React, { useContext } from "react";
import groupInfoPopUpStyle from "@/styles/common/popups/GroupInfoPopUp.module.css";
import { InternalPageContext } from "@/pages/internal";
import CloseButton from "../buttons/CloseButton";
import { Props } from "@/types/props";

export default function GroupInfoPopUp() {

    const { groupInfoPopUpVisibility, hideFirstLayerOverlayAndPopUps } = useContext(InternalPageContext);

    const origin = "group--info";

    const closeButtonProps: Props.ExitButtonProps = {
        origin: origin,
        actionFunction: hideFirstLayerOverlayAndPopUps
    };

    return (
        <div className={`${groupInfoPopUpStyle.group__info__pop__up__container} 
          ${groupInfoPopUpStyle[groupInfoPopUpVisibility]}`}
        >
            <CloseButton {...closeButtonProps}/>
        </div>
    );
}
