import React from "react";
import joinPopUpStyle from "@/styles/internal/main/Main.module.css";
import Image from "next/image";

export default function GroupPopUp({ 
    firstImage, 
    secondImage, 
    firstLabelMessage,
    secondLabelMessage,
    popUpType,
    handlePopUpGroupState,
    changeFirstInput, 
    changeSecondInput, 
    handleJoinClick,
    handleCreateClick,
    firstValue,
    secondValue
}: any) {

    const buttonElementsAnOr = [
        <button className={joinPopUpStyle.confirm__entry__button} onClick={handleJoinClick}> Join </button>,
        <span className={joinPopUpStyle.message__buttons__separator}> or </span>,
        <button className={joinPopUpStyle.confirm__create__button} onClick={handleCreateClick}> Create a group </button>
    ];

    return (
        <React.Fragment>
            <div className={joinPopUpStyle.exit__button__section}>
                <button className={joinPopUpStyle.exit__button} onClick={handlePopUpGroupState}>
                    <div className={joinPopUpStyle.exit__button__line}/>
                    <div className={joinPopUpStyle.exit__button__line}/>
                </button>
            </div>
            <div className={joinPopUpStyle.inputs__block}>
                <label htmlFor="first__input__id" className={joinPopUpStyle.input__label}>{ firstLabelMessage }</label>
                <div className={joinPopUpStyle.first__input__block}>
                    <div className={joinPopUpStyle.first__icon__block}>
                            <Image src={firstImage} alt="#" className={joinPopUpStyle.first__icon}/>
                    </div>
                    <input type="text" id="first__input__id" className={joinPopUpStyle.first__input} 
                        onChange={(event) => changeFirstInput(event.target.value)} value={firstValue}/>
                </div>
                <label htmlFor="second__input__id" className={joinPopUpStyle.input__label}>{ secondLabelMessage }</label>
                <div className={joinPopUpStyle.second__input__block}>
                    <div className={joinPopUpStyle.second__icon__block}>
                        <Image src={secondImage} alt="#" className={joinPopUpStyle.second__icon}/>
                    </div>
                    <input type="text" id="second__input__id" className={joinPopUpStyle.second__input} 
                        onChange={(event) => changeSecondInput(event.target.value)} value={secondValue}/>
                </div>
                <div className={joinPopUpStyle.confirmation__area}>
                    {(popUpType === "join")? (buttonElementsAnOr.map(element => element)) : 
                    (buttonElementsAnOr.reverse().map(element => element))}
                </div>
            </div>
        </React.Fragment>
    );
}