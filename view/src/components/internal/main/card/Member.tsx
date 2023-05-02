import React from "react";
import Image from "next/image";
import Profile from "../../../../../public/assets/profile.png";
import memberStyle from "@/styles/internal/main/cards/Member.module.css";
import { Data } from "@/types/data";


export default function Member({ name, roles }: Data.IMember) {
    return (
        <div className={memberStyle.member__info}>
            <Image src={Profile} alt="user profile" className={memberStyle.member__profile__image}/>
            <div className={memberStyle.member__name__role__block}>
                <p className={memberStyle.member__name}>{ name }</p>
                <p className={memberStyle.member__role}>{ roles!.indexOf("admin") !== -1? "Admin" : "Member" }</p>
            </div>
        </div>
    );
}
