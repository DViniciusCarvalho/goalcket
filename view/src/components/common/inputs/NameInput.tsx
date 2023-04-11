import Image from "next/image";
import { InputProps } from "@/types/types";
import inputStyle from "@/styles/common/inputs/Inputs.module.css";
import UserImage from "../../../../public/assets/user.png";

export default function NameInput({ changeValue, value }: InputProps){
    return(
        <div className={inputStyle.name__block}>
            <label htmlFor="name__input" className={inputStyle.data__label}> Name: </label>
            <div className={inputStyle.name__area}>
                <div className={inputStyle.name__image__area}>
                    <Image src={UserImage} alt="eye image" className={inputStyle.input__symbol}/>
                </div>
                <input type="text" name="name" id="name__input" className={ inputStyle.name__input } onChange={(event) => changeValue(event)} required value={value}/>
            </div>
        </div>
    );
}