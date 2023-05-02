import inputStyle from "@/styles/common/inputs/Inputs.module.css";
import LetterImage from "../../../../public/assets/letter.png";
import Image from "next/image";
import { Props } from "@/types/props";

export default function EmailInput({ changeValue, value }: Props.InputProps){
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