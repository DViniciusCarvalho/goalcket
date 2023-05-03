import React, { useContext } from "react";
import Image from "next/image";
import Profile from "../../../../../public/assets/profile.png";
import memberStyle from "@/styles/internal/main/cards/Member.module.css";
import { Data } from "@/types/data";
import { InternalPageContext } from "@/pages/internal";


export default function Member({ name, id, roles }: Data.MemberData) {

    const { handleMemberInfoPopUpState } = useContext(InternalPageContext);

    return (
        <div className={memberStyle.member__info} onDoubleClick={() => handleMemberInfoPopUpState(name, id, roles)}>
            <Image src={Profile} alt="user profile" className={memberStyle.member__profile__image}/>
            <div className={memberStyle.member__name__role__block}>
                <p className={memberStyle.member__name}>{ name }</p>
                <p className={memberStyle.member__role}>{ roles!.indexOf("admin") !== -1? "Admin" : "Member" }</p>
            </div>
        </div>
    );
}
