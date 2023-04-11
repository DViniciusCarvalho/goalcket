import React, { useState } from "react";
import menuStyles from "../../../styles/common/header/Menu.module.css";
import { MenuProps } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Menu({ headerPosition }: MenuProps){

    const router = useRouter();

    const [ menuVisibility, setMenuVisibility ] = useState<string>("invisible");
    const [ buttonStatus, setButtonStatus ] = useState<string>("closed");

    const changeMenuVisibility = (): void => {
        setMenuVisibility((prevVisibility) => {
            const newVisibility = prevVisibility === "invisible" ? "visible" : "invisible";
            return newVisibility;
        });
        setButtonStatus((prevStatus) => {
            const newVisibility = prevStatus === "openned" ? "closed" : "openned";
            return newVisibility;
        });
    }

    const goToLogin = () => {
        router.push("/login");
    }

    return(            
        <nav className={`${menuStyles.header__menu__navigation} ${menuStyles[headerPosition]}`}>
            <button className={`${menuStyles.header__menu__button} ${menuStyles[buttonStatus]}`} onClick={changeMenuVisibility}>
                <div className={`${menuStyles.header__menu__button__line} ${menuStyles.top__line}`}></div>
                <div className={`${menuStyles.header__menu__button__line} ${menuStyles.middle__line}`}></div>
                <div className={`${menuStyles.header__menu__button__line} ${menuStyles.bottom__line}`}></div>
            </button>
            <ul className={`${menuStyles.header__menu__items} ${menuStyles[menuVisibility]}`}>
                <li className={menuStyles.header__menu__item}> <Link href="/" className={menuStyles.link}>Home</Link></li>
                <li className={menuStyles.header__menu__item}> <Link href="/about" className={menuStyles.link}>About</Link></li>
                <button className={menuStyles.header__menu__signin__button} onClick={goToLogin}>Sign in</button>
            </ul>
        </nav>
    );
}