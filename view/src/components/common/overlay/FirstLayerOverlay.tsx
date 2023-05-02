import React from "react";
import overlayStyle from "@/styles/common/overlay/Overlay.module.css";
import { Props } from "@/types/props";

export default function FirstLayerOverlay({ visibility, hideFirstLayerOverlayAndPopUps }: Props.OverlayProps) {
    return (
        <div className={`${overlayStyle.first__layer} ${overlayStyle[visibility]}`} onClick={hideFirstLayerOverlayAndPopUps}></div>
    );
}
