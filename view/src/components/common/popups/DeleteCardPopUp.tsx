import React, { useContext } from "react";
import deleteCardPopUpStyle from "@/styles/common/popups/DeleteCardPopUp.module.css";
import WarningIcon from "../../../../public/assets/attention.png";
import Image from "next/image";
import { InternalPageContext } from "@/pages/internal";

export default function DeleteCardPopUp() {

    const { 
        deleteCardPopUpVisibility, 
        hideSecondLayerOverlayAndBigCardOptionPopUps, 
        handleDeleteCard 
    } = useContext(InternalPageContext);

    return (
        <div className={`${deleteCardPopUpStyle.delete__card__pop__up__container} 
          ${deleteCardPopUpStyle[deleteCardPopUpVisibility]}`}
        >
            <div className={deleteCardPopUpStyle.close__button__block}>
                <button className={deleteCardPopUpStyle.close__button} 
                  onClick={hideSecondLayerOverlayAndBigCardOptionPopUps}
                >
                    <div className={deleteCardPopUpStyle.close__button__line}/>
                    <div className={deleteCardPopUpStyle.close__button__line}/>
                </button>
            </div>
            <div className={deleteCardPopUpStyle.alert__block}>
                <Image src={WarningIcon} alt="warning icon" className={deleteCardPopUpStyle.alert__icon}/>
                <p className={deleteCardPopUpStyle.alert__message}> 
                    Are you sure that you want to delete this card? This is an irreversible action
                </p>
            </div>
            <div className={deleteCardPopUpStyle.decision__buttons__block}>
                <button className={deleteCardPopUpStyle.confirm__delete__button} onClick={handleDeleteCard}>
                    Confirm
                </button>
                <button className={deleteCardPopUpStyle.cancel__delete__button} 
                  onClick={hideSecondLayerOverlayAndBigCardOptionPopUps}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
