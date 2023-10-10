import React, { useContext } from 'react';
import functStyle from '@/styles/internal/main/functionalities/Functionalities.module.css';
import SearchIcon from '../../../../../public/assets/search.png';
import { InternalMainContentContext } from '@/components/internal/main/InternalMainContent';
import Image from 'next/image';
import ActionButton from '@/components/common/buttons/ActionButton';
import { Props } from '@/types/props';


export default function SearchCard() {

    const { 
        searchMatches, 
        searchInputRef 
    } = useContext(InternalMainContentContext);

    const ORIGIN = 'search--card';

    const searchCardButtonProps: Props.ActionButtonProps = {
        origin: ORIGIN,
        message: 'Search',
        actionFunction: searchMatches
    };


    return (
        <div className={functStyle.search__card__container}>
            <div className={functStyle.search__input__block}>
            <div className={functStyle.search__icon__block} onClick={searchMatches}>
                <Image 
                    src={SearchIcon} 
                    alt='search icon' 
                    className={functStyle.search__icon}
                />
            </div>
            <input type='text' className={functStyle.search__input} ref={searchInputRef}/>
            </div>
            <ActionButton {...searchCardButtonProps}/>
        </div>
    )
}
