import React, { useState } from "react";
import headerStyle from "../../../styles/common/header/Header.module.css";
import Menu from "./Menu";
import { debounce } from "@/lib/utils";
import { Props } from "@/types/props";


export default function Header({ needChangeBackground, headerPage }: Props.HeaderProps){

    const [ headerBackgroundColor, setHeaderBackgroundColor ] = useState<string>("in--origin");

    const menuProps: Props.MenuProps = {
        headerPosition: headerBackgroundColor
    }

    function defineHeaderClass (scrollTop: number): void {
        setHeaderBackgroundColor(() => scrollTop <= 300? "in--origin" : "out--origin");
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