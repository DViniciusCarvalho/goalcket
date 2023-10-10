import React, { useContext } from 'react';
import deleteCardPopUpStyle from '@/styles/common/popups/DeleteCardPopUp.module.css';
import WarningIcon from '../../../../public/assets/attention.png';
import Image from 'next/image';
import CloseButton from '../buttons/CloseButton';
import { InternalPageContext } from '@/pages/internal';
import ActionButton from '../buttons/ActionButton';
import { Props } from '@/types/props';


export default function DeleteCardPopUp() {

    const { 
        deleteCardPopUpVisibility, 
        hideSecondLayerOverlayAndBigCardOptionPopUps, 
        handleDeleteCard 
    } = useContext(InternalPageContext);


    const ORIGIN = 'delete--card';


    const closeButtonProps: Props.ExitButtonProps = {
        origin: ORIGIN,
        actionFunction: hideSecondLayerOverlayAndBigCardOptionPopUps
    };

    const confirmDeleteButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: 'Confirm',
        actionFunction: handleDeleteCard
    };

    const cancelDeleteButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: 'Cancel',
        actionFunction: hideSecondLayerOverlayAndBigCardOptionPopUps
    };


    return (
        <div 
            className={`
                ${deleteCardPopUpStyle.delete__card__pop__up__container} 
                ${deleteCardPopUpStyle[deleteCardPopUpVisibility]}
                `
            }
        >
            <CloseButton {...closeButtonProps}/>
            <div className={deleteCardPopUpStyle.alert__block}>
                <Image 
                    src={WarningIcon} 
                    alt='warning icon' 
                    className={deleteCardPopUpStyle.alert__icon}
                />
                <p className={deleteCardPopUpStyle.alert__message}> 
                    Are you sure that you want to delete this card? This is an irreversible action
                </p>
            </div>
            <div className={deleteCardPopUpStyle.decision__buttons__block}>
                <ActionButton {...confirmDeleteButtonProps}/>
                <ActionButton {...cancelDeleteButtonProps}/>
            </div>
        </div>
    );
}
