import React, { useContext } from "react";
import functStyle from "@/styles/internal/main/functionalities/Functionalities.module.css";
import SearchIcon from "../../../../../public/assets/search.png";
import { InternalMainContentContext } from "@/components/internal/main/InternalMainContent";
import Image from "next/image";


export default function SearchCard() {

    const { searchMatches, searchInputRef } = useContext(InternalMainContentContext);

    return (
        <div className={functStyle.search__card__container}>
            <div className={functStyle.search__input__block}>
            <div className={functStyle.search__icon__block} onClick={searchMatches}>
                <Image src={SearchIcon} alt="search icon" className={functStyle.search__icon}/>
            </div>
            <input type="text" className={functStyle.search__input} ref={searchInputRef}/>
            </div>
            <button className={functStyle.search__button} onClick={searchMatches}> Search </button>
        </div>
    )
}
