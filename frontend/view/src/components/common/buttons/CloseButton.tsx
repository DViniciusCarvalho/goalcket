import React from 'react';
import closeButtonStyle from '@/styles/common/buttons/CloseButton.module.css';
import { Props } from '@/types/props';

export default function CloseButton({ 
    origin, 
    actionFunction 
}: Props.ExitButtonProps) {

    return (
        <div 
            className={`
                ${closeButtonStyle.close__button__block} 
                ${closeButtonStyle[origin]}
                `
            }
        >
            <button 
                className={closeButtonStyle.close__button}
                onClick={actionFunction}
            >
                <div className={closeButtonStyle.close__button__line}/>
                <div className={closeButtonStyle.close__button__line}/>
            </button>
        </div>
    );
}
