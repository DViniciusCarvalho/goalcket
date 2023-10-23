import React from 'react';
import groupPopUpStyle from '@/styles/common/popups/GroupPopUp.module.css';
import Image from 'next/image';
import CloseButton from '../buttons/CloseButton';
import ActionButton from '../buttons/ActionButton';
import { Props } from '@/types/props';


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

    const ORIGIN = 'create--join--group';


    const closeButtonProps: Props.ExitButtonProps = {
        origin: ORIGIN,
        actionFunction: hideFirstLayerOverlayAndPopUps
    };

    const joinGroupButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: 'Join',
        actionFunction: handleJoinClick
    };

    const createGroupButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: 'Create a group',
        actionFunction: handleCreateClick
    };


    const buttonElementsAnOr = [
        <ActionButton 
            {...joinGroupButtonProps} 
            key={1}
        />,
        <span 
            className={groupPopUpStyle.message__buttons__separator} 
            key={2}
        > 
            or 
        </span>,
        <ActionButton 
            {...createGroupButtonProps} 
            key={3}
        />
    ];

    return (
        <React.Fragment>
            <CloseButton {...closeButtonProps}/>
            <div className={groupPopUpStyle.inputs__block}>
                <label 
                    htmlFor='first__input__id' 
                    className={groupPopUpStyle.input__label}
                >
                    {firstLabelMessage}
                </label>
                <div className={groupPopUpStyle.first__input__block}>
                    <div className={groupPopUpStyle.first__icon__block}>
                        <Image 
                            src={firstImage} 
                            alt='#' 
                            className={groupPopUpStyle.first__icon}
                        />
                    </div>
                    <input 
                        type='text' 
                        id='first__input__id' 
                        className={groupPopUpStyle.first__input} 
                        ref={firstInputRef}
                    />
                </div>
                <label 
                    htmlFor='second__input__id' 
                    className={groupPopUpStyle.input__label}
                >
                    {secondLabelMessage}
                </label>
                <div className={groupPopUpStyle.second__input__block}>
                    <div className={groupPopUpStyle.second__icon__block}>
                        <Image 
                            src={secondImage} 
                            alt='#' 
                            className={groupPopUpStyle.second__icon}
                        />
                    </div>
                    <input 
                        type='text' 
                        id='second__input__id' 
                        placeholder={'min 9 chars'}
                        className={groupPopUpStyle.second__input} 
                        ref={secondInputRef}
                    />
                </div>
                <div className={groupPopUpStyle.confirmation__area}>
                    {
                        (popUpType === 'join')
                        ? (buttonElementsAnOr.map(element => element)) 
                        : (buttonElementsAnOr.reverse().map(element => element))
                    }
                </div>
            </div>
        </React.Fragment>
    );
}