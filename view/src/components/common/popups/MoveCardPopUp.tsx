import React, { useContext, useState } from "react";

import moveCardPopUpStyle from "@/styles/common/popups/MoveCardPopUp.module.css";

import ToDoIcon from "../../../../public/assets/todolist.png";
import DoingIcon from "../../../../public/assets/doinglist.png";
import DoneIcon from "../../../../public/assets/donelist.png";

import { InternalPageContext } from "@/pages/internal";

import Image, { StaticImageData } from "next/image";


export default function MoveCardPopUp() {
    
    const { 
        moveCardPopUpVisibility, 
        handleMoveCard, 
        currentColumn, 
        hideSecondLayerOverlayAndBigCardOptionPopUps 
    } = useContext(InternalPageContext);

    const [ currentChecked, setCurrentChecked ] = useState("");


    function getCapitalized(word: string): string {
        if (word === "todo") {
            return "To Do";
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function getCheckedClass(column: string): string {
        return (column === currentChecked)? "checked" : "no-checked";
    }

    function checkButton(column: string): void {
        setCurrentChecked(() => column);
    }

    function resetChecked(): void {
        setCurrentChecked(() => "");
    }

    function handleCloseAction(): void {
        resetChecked();
        hideSecondLayerOverlayAndBigCardOptionPopUps();
    }

    function getOtherColumns() {
        const columns = [ "todo", "doing", "done" ];
        const buttonsFiltered: JSX.Element[] = [];
        const icons: {[key: string]: StaticImageData} = {
            todo: ToDoIcon,
            doing: DoingIcon,
            done: DoneIcon
        };

        for (let column of columns) {
            if (column !== currentColumn) {
                buttonsFiltered.push(
                    <button className={`${moveCardPopUpStyle.column__button} ${moveCardPopUpStyle[getCheckedClass(column)]}`} key={column} onClick={() => checkButton(column)}>
                        <Image src={icons[column]} alt={`${column} icon`} className={moveCardPopUpStyle.column__icon}/>
                        {getCapitalized(column)}
                    </button>
                );
            }
        }
        return buttonsFiltered;
    }

    return (
        <div className={`${moveCardPopUpStyle.move__card__pop__up__container} 
          ${moveCardPopUpStyle[moveCardPopUpVisibility]}`}
        >
            <div className={moveCardPopUpStyle.close__button__block}>
                <button className={moveCardPopUpStyle.close__button} 
                   onClick={handleCloseAction}>
                    <div className={moveCardPopUpStyle.close__button__line}/>
                    <div className={moveCardPopUpStyle.close__button__line}/>
                </button>
            </div>
            <h3 className={moveCardPopUpStyle.ask__text} onClick={getOtherColumns}>Where do you want to move?</h3>
            <div className={moveCardPopUpStyle.columns__button__area}>
                {
                    getOtherColumns().map(element => (
                        element
                    ))
                }
            </div>
            <div className={moveCardPopUpStyle.decision__buttons__block}>
                <button className={moveCardPopUpStyle.confirm__delete__button} 
                  onClick={() => handleMoveCard(currentChecked)}
                >
                    Confirm
                </button>
                <button className={moveCardPopUpStyle.cancel__delete__button} 
                  onClick={handleCloseAction}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}