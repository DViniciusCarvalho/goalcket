import React from "react";
import overlayStyle from "@/styles/common/overlay/Overlay.module.css";


export default function SecondLayerOverlay({ visibility, hideSecondLayerOverlayAndBigCardOptionPopUps }: any) {
    return (
        <div className={`${overlayStyle.second__layer} ${overlayStyle[visibility]}`} 
          onClick={hideSecondLayerOverlayAndBigCardOptionPopUps}
        />
    );
}
