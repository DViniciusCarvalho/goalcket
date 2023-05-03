import React, { useContext, useRef } from "react";

import bigCardStyle from "@/styles/common/popups/BigCardPopUp.module.css";

import DeleteIcon from "../../../../public/assets/delete.png";
import MoveIcon from "../../../../public/assets/move.png";
import SaveIcon from "../../../../public/assets/save.png";

import { InternalPageContext } from "@/pages/internal";

import Image from "next/image";
import CloseButton from "../buttons/CloseButton";

import { formatDate } from "@/lib/utils";

import { Props } from "@/types/props";


export default function BigCard({ content, priority, timestamp, id, creator, column }: Props.BigCardProps) {

    const cardContentRef = useRef(null);

    const { 
        bigCardPopUpVisibility,
        hideFirstLayerOverlayAndPopUps,
        handleDeleteCardPopUpState, 
        handleMoveCardPopUpState,
        handleSaveCard
    } = useContext(InternalPageContext);

    const origin = "big--card";
    
    const closeButtonProps: Props.ExitButtonProps = {
        origin: origin,
        actionFunction: hideFirstLayerOverlayAndPopUps
    };

    return (
        <div className={`${bigCardStyle.big__card__container} ${bigCardStyle[bigCardPopUpVisibility]}`}>
            <div className={bigCardStyle.big__card__header}>
                <CloseButton {...closeButtonProps}/>
                <div className={bigCardStyle.big__card__info__block}>
                    <div className={bigCardStyle.big__card__info__creator__and__date}>
                        <p className={bigCardStyle.big__card__info__creator}> 
                            Created by: { creator.name }
                        </p>
                        <p className={bigCardStyle.big__card__info__date}> 
                            { formatDate(timestamp) } 
                        </p>
                    </div>
                    <div className={bigCardStyle.big__card__info__priority}>
                        <p className={bigCardStyle.big__card__info__priority__text}> Priority: { priority }</p>
                        <div className={`${bigCardStyle.big__card__info__priority__colorization} 
                          ${bigCardStyle[priority]}`}
                        />
                    </div>
                </div>
                <div className={bigCardStyle.big__card__buttons__block}>
                    <button onClick={() => handleDeleteCardPopUpState(id, column)}>
                        <Image src={DeleteIcon} alt="garbage icon" 
                            className={bigCardStyle.big__card__button__exclude__icon}
                        />
                        Delete
                    </button>
                    <button onClick={() => handleMoveCardPopUpState(content, priority, timestamp, id, creator, column)}>
                        <Image src={MoveIcon} alt="move icon" 
                            className={bigCardStyle.big__card__button__move__icon}
                        />
                        Move
                    </button>
                    <button onClick={
                        () => handleSaveCard(
                            id,
                            column,
                            content, 
                            (cardContentRef.current! as HTMLParagraphElement).innerText
                        )}
                    >
                        <Image src={SaveIcon} alt="disket icon" 
                            className={bigCardStyle.big__card__button__move__icon}
                        />
                        Save
                    </button>
                </div>
            </div>
            <p className={bigCardStyle.big__card__content} ref={cardContentRef} contentEditable="true">
                { content }
            </p>
        </div>
    );
}