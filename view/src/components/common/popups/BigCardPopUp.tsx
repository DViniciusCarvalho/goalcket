import React, { useContext, useRef, useState } from "react";
import bigCardStyle from "@/styles/common/popups/BigCardPopUp.module.css";
import DeleteIcon from "../../../../public/assets/delete.png";
import MoveIcon from "../../../../public/assets/move.png";
import SaveIcon from "../../../../public/assets/save.png";
import Image from "next/image";
import { InternalPageContext } from "@/pages/internal";
import { formatDate, getPriorityBackground } from "@/lib/utils";
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

    return (
        <div className={`${bigCardStyle.big__card__container} ${bigCardStyle[bigCardPopUpVisibility]}`}>
            <div className={bigCardStyle.big__card__header}>
                <div className={bigCardStyle.big__card__close__block}>
                    <button className={bigCardStyle.close__button} onClick={hideFirstLayerOverlayAndPopUps}>
                        <div className={bigCardStyle.close__button__line}/>
                        <div className={bigCardStyle.close__button__line}/>
                    </button>
                </div>
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
                        <div className={bigCardStyle.big__card__info__priority__colorization}
                            style={{backgroundImage: getPriorityBackground(priority)}}
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