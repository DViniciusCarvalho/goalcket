import Image from "next/image";
import { InputProps } from "@/types/types";
import inputStyle from "@/styles/common/inputs/Inputs.module.css";
import LetterImage from "../../../../public/assets/letter.png";

export default function EmailInput({ changeValue, value }: InputProps){
    return(
        <div className={inputStyle.email__block}>
            <label htmlFor="email__input" className={inputStyle.data__label}> E-mail: </label>
            <div className={inputStyle.email__area}>
                <div className={inputStyle.email__image__area}>
                    <Image src={LetterImage} alt="eye image" className={inputStyle.input__symbol}/>
                </div>
                <input type="email" name="email" id="email__input" className={inputStyle.email__input} onChange={(event) => changeValue(event)} required value={value}/>
            </div>
        </div>
    );
}