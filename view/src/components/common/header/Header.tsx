import React, { useState } from "react";
import headerStyle from "../../../styles/common/header/Header.module.css";
import Menu from "./Menu";
import { HeaderProps, MenuProps } from "@/types/types";
import { debounce } from "@/utils/debounce";

export default function Header({ needChangeBackground, headerPage }: HeaderProps){

    const [ headerBackgroundColor, setHeaderBackgroundColor ] = useState<string>("in--origin");

    const menuProps: MenuProps = {
        headerPosition: headerBackgroundColor
    }

    const defineHeaderClass = (scrollTop: number): void => {
        if(scrollTop <= 300){
            setHeaderBackgroundColor("in--origin");
        }
        else {
            setHeaderBackgroundColor("out--origin");
        }
    }

    if(typeof window !== "undefined" && needChangeBackground){
        window.addEventListener("scroll", debounce(() => {
            
            const html = document.documentElement!;
            const scrollTop = html.scrollTop || document.body.scrollTop;
            defineHeaderClass(scrollTop);
        }, 60, true));
    }

    return (
        <header className={`${headerStyle.header} ${headerStyle[headerPage]} ${headerStyle[headerBackgroundColor]}`}>
            <div className={headerStyle.header__logo}> GOALCKET </div>
            <Menu {...menuProps}/>
        </header>
    );
}