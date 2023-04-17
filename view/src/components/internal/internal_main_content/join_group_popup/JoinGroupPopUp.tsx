import React from "react";
import joinPopUpStyle from "@/styles/internal/main/Main.module.css";
import Image from "next/image";

export default function JoinGroupPopUp() {
  return (
    <div className={joinPopUpStyle.pop__up__container}>
        <div className={joinPopUpStyle.exit__button__section}>
            <button className={joinPopUpStyle.exit__button}>
                <div className={joinPopUpStyle.exit__button__line}></div>
                <div className={joinPopUpStyle.exit__button__line}></div>
            </button>
        </div>
        <label htmlFor="group__token"></label>
        <div className={joinPopUpStyle.group__token__block}>
            <div className={joinPopUpStyle.token__icon__block}>
                {/* <Image src={"1"} alt="a" className={joinPopUpStyle.token__icon}/> */}
            </div>
            <input type="text" id="group__token" className={joinPopUpStyle.group__token__input}/>
        </div>
        <label htmlFor="group__psswd"></label>
        <div className={joinPopUpStyle.group__password__block}>
            <div className={joinPopUpStyle.key__icon__block}>
                {/* <Image src={"1"} alt="a" className={joinPopUpStyle.key__icon}/> */}
            </div>
            <input type="text" id="group__psswd" className={joinPopUpStyle.group__password__input}/>
        </div>
        <button className={joinPopUpStyle.confirm__entry__button}> Join </button>
    </div>
  )
}
