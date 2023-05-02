import React from "react";
import groupPopUpStyle from "@/styles/common/popups/GroupPopUp.module.css";
import Image from "next/image";
import { Props } from "@/types/props";


export default function GroupPopUp({ 
    firstImage, 
    secondImage, 
    firstLabelMessage,
    secondLabelMessage,
    popUpType,
    firstInputRef,
    secondInputRef,
    hideFirstLayerOverlayAndPopUps,
    handleJoinClick,
    handleCreateClick
}: Props.GroupPopUpProps) {

    const buttonElementsAnOr = [
        <button className={groupPopUpStyle.confirm__entry__button} onClick={handleJoinClick} key={1}> Join </button>,
        <span className={groupPopUpStyle.message__buttons__separator} key={2}> or </span>,
        <button className={groupPopUpStyle.confirm__create__button} onClick={handleCreateClick} key={3}> 
            Create a group 
        </button>
    ];

    return (
        <React.Fragment>
            <div className={groupPopUpStyle.exit__button__section}>
                <button className={groupPopUpStyle.exit__button} onClick={hideFirstLayerOverlayAndPopUps}>
                    <div className={groupPopUpStyle.exit__button__line}/>
                    <div className={groupPopUpStyle.exit__button__line}/>
                </button>
            </div>
            <div className={groupPopUpStyle.inputs__block}>
                <label htmlFor="first__input__id" className={groupPopUpStyle.input__label}>{ firstLabelMessage }</label>
                <div className={groupPopUpStyle.first__input__block}>
                    <div className={groupPopUpStyle.first__icon__block}>
                        <Image src={firstImage} alt="#" className={groupPopUpStyle.first__icon}/>
                    </div>
                    <input type="text" id="first__input__id" className={groupPopUpStyle.first__input} ref={firstInputRef}/>
                </div>
                <label htmlFor="second__input__id" className={groupPopUpStyle.input__label}>{ secondLabelMessage }</label>
                <div className={groupPopUpStyle.second__input__block}>
                    <div className={groupPopUpStyle.second__icon__block}>
                        <Image src={secondImage} alt="#" className={groupPopUpStyle.second__icon}/>
                    </div>
                    <input type="text" id="second__input__id" className={groupPopUpStyle.second__input} ref={secondInputRef}/>
                </div>
                <div className={groupPopUpStyle.confirmation__area}>
                    {
                        (popUpType === "join")? (buttonElementsAnOr.map(element => element)) : 
                        (buttonElementsAnOr.reverse().map(element => element))
                    }
                </div>
            </div>
        </React.Fragment>
    );
}