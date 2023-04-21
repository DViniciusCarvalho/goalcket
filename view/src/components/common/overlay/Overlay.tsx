import React from "react";
import overlayStyle from "@/styles/common/overlay/Overlay.module.css";
import { OverlayProps } from "@/types/types";

export default function Overlay({ visibility, handlePopUpGroupState }: OverlayProps) {
  return (
    <div className={`${overlayStyle.overlay} ${overlayStyle[visibility]}`} onClick={handlePopUpGroupState}></div>
  )
}
