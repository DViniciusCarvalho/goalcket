import React, { useContext, useState } from 'react';

import moveCardPopUpStyle from '@/styles/common/popups/MoveCardPopUp.module.css';

import ToDoIcon from '../../../../public/assets/todolist.png';
import DoingIcon from '../../../../public/assets/doinglist.png';
import DoneIcon from '../../../../public/assets/donelist.png';

import { InternalPageContext } from '@/pages/internal';

import CloseButton from '../buttons/CloseButton';

import Image, { StaticImageData } from 'next/image';
import ActionButton from '../buttons/ActionButton';

import { Props } from '@/types/props';


export default function MoveCardPopUp() {
    
    const { 
        moveCardPopUpVisibility, 
        handleMoveCard, 
        currentColumn, 
        hideSecondLayerOverlayAndBigCardOptionPopUps 
    } = useContext(InternalPageContext);


    const [ 
        currentChecked, 
        setCurrentChecked 
    ] = useState('');


    const ORIGIN = 'move--card';


    const closeButtonProps: Props.ExitButtonProps = {
        origin: ORIGIN,
        actionFunction: handleCloseAction
    };

    const confirmMoveButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: 'Confirm',
        actionFunction: () => handleMoveCard(currentChecked)
    }

    const cancelMoveButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: 'Cancel',
        actionFunction: handleCloseAction
    };
    
    
    function getCapitalized(
        word: string
    ): string {

        if (word === 'todo') {
            return 'To Do';
        }

        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    function getCheckedClass(
        column: string
    ): string {

        return column === currentChecked? 'checked' : 'no-checked';
    }


    function checkButton(
        column: string
    ): void {

        setCurrentChecked(previous => column);
    }


    function resetChecked(): void {

        setCurrentChecked(previous => '');
    }


    function handleCloseAction(): void {

        resetChecked();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }


    function getOtherColumns(): JSX.Element[] {

        const columns = [ 
            'todo', 
            'doing', 
            'done' 
        ];

        const buttonsFiltered: JSX.Element[] = [];

        const icons: {[key: string]: StaticImageData} = {
            todo: ToDoIcon,
            doing: DoingIcon,
            done: DoneIcon
        };

        for (let column of columns) {
            if (column !== currentColumn) {
                buttonsFiltered.push(
                    <button 
                        className={`
                            ${moveCardPopUpStyle.column__button} 
                            ${moveCardPopUpStyle[getCheckedClass(column)]}
                            `
                        } 
                        key={column} 
                        onClick={() => checkButton(column)}
                    >
                        <Image 
                            src={icons[column]} 
                            alt={`${column} icon`} 
                            className={moveCardPopUpStyle.column__icon}
                        />
                        {getCapitalized(column)}
                    </button>
                );
            }
        }

        return buttonsFiltered;
    }


    return (
        <div 
            className={`
                ${moveCardPopUpStyle.move__card__pop__up__container} 
                ${moveCardPopUpStyle[moveCardPopUpVisibility]}
                `
            }
        >
            <CloseButton {...closeButtonProps}/>
            <h3 
                className={moveCardPopUpStyle.ask__text} 
                onClick={getOtherColumns}
            >
                Where do you want to move?
            </h3>
            <div className={moveCardPopUpStyle.columns__button__area}>
                {getOtherColumns().map(column => column)}
            </div>
            <div className={moveCardPopUpStyle.decision__buttons__block}>
                <ActionButton {...confirmMoveButtonProps}/>
                <ActionButton {...cancelMoveButtonProps}/>
            </div>
        </div>
    );
}