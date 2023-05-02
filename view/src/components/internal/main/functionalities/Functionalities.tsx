import React, { useContext } from "react";
import functStyle from "@/styles/internal/main/functionalities/Functionalities.module.css";
import ClipIcon from "../../../../../public/assets/clip.png";
import AddIcon from "../../../../../public/assets/add.png";
import { InternalPageContext } from "@/pages/internal";
import { InternalMainContentContext } from "@/components/internal/main/InternalMainContent";
import Image from "next/image";
import SearchCard from "@/components/internal/main/functionalities/SearchCard";
import AddCard from "@/components/internal/main/functionalities/AddCard";
import { Props } from "@/types/props";

export default function Functionalities({ isGroup }: Props.FunctionalitiesProps){

    const { currentGroupId, changePopUpToVisible } = useContext(InternalPageContext);
    const { hashTextRef } = useContext(InternalMainContentContext);
    
    function copyHash() {
        const hashTextElement = hashTextRef.current! as HTMLParagraphElement;
        const hashValue = hashTextElement.innerText;
        navigator.clipboard.writeText(hashValue);
    }

    return (
        <div className={functStyle.funct__container}>
            <SearchCard/>
            <button className={functStyle.show__add__card__button} onClick={() => changePopUpToVisible("addCard")}>
                <Image src={AddIcon} alt="add icon" className={functStyle.add__icon}/>           
                Add card
            </button>
            <AddCard />
            { isGroup && (
                <div className={functStyle.group__token__block}>
                    <p className={functStyle.group__token} ref={hashTextRef}> {currentGroupId} </p>
                    <button className={functStyle.copy__token__button} onClick={copyHash}>
                        <Image src={ClipIcon} alt="copy icon" className={functStyle.copy__icon}/>
                    </button>
                </div>
            )}
        </div>
    );
}
