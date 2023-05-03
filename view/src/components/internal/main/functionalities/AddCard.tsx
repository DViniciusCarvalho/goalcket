import React, { useContext } from "react";
import functStyle from "@/styles/internal/main/functionalities/Functionalities.module.css";
import { InternalPageContext } from "@/pages/internal";
import { InternalMainContentContext } from "@/components/internal/main/InternalMainContent";
import CloseButton from "@/components/common/buttons/CloseButton";
import ActionButton from "@/components/common/buttons/ActionButton";
import { Props } from "@/types/props";

export default function AddCard() {
    
    const { hideFirstLayerOverlayAndPopUps, addCardPopUpVisibility } = useContext(InternalPageContext);
    const { destinationRef, priorityRef, contentRef, addCard } = useContext(InternalMainContentContext);

    const origin = "add--card";

    const closeButtonProps: Props.ExitButtonProps = {
        origin: origin,
        actionFunction: hideFirstLayerOverlayAndPopUps
    };

    const addCardButtonProps: Props.ActionButtonProps = {
        origin: origin,
        message: "Add",
        actionFunction: addCard
    };

    return (
        <div className={`${functStyle.add__card__container} ${functStyle[addCardPopUpVisibility]}`}>
            <CloseButton {...closeButtonProps}/>
            <div className={functStyle.new__card__info}>
                <div className={functStyle.destination__block}>
                    <label htmlFor="c__destination" className={functStyle.destination__label}>Destination</label>
                    <select className={functStyle.column__destination} id="c__destination" ref={destinationRef}>
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div className={functStyle.priority__block}>
                    <label htmlFor="s__priority" className={functStyle.priority__label}>Priority</label>
                    <select className={functStyle.priority__select} id="s__priority" ref={priorityRef}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <div className={functStyle.content__text__block}>
                <label htmlFor="content__text" className={functStyle.context__text__label}>Content:</label>
                <textarea id="content__text" className={functStyle.content__textarea} ref={contentRef}></textarea>
            </div>
            <ActionButton {...addCardButtonProps}/>
      </div>
    )
}
