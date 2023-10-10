import React from 'react';
import overlayStyle from '@/styles/common/overlay/Overlay.module.css';
import { Props } from '@/types/props';


export default function SecondLayerOverlay({ 
	visibility, 
	hideSecondLayerOverlayAndBigCardOptionPopUps 
}: Props.SecondLayerOverlayProps) {

    return (
        <div 
            className={`
				${overlayStyle.second__layer} 
				${overlayStyle[visibility]}
				`
			} 
            onClick={hideSecondLayerOverlayAndBigCardOptionPopUps}
        />
    );
}
