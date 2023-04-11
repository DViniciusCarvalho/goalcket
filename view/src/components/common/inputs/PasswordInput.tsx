import Image from "next/image";
import { InputProps } from "@/types/types";
import inputStyle from "@/styles/common/inputs/Inputs.module.css";
import KeyImage from "../../../../public/assets/key.png";

export default function PasswordInput({ margin, changeValue, value }: InputProps){
    return(
        <div className={inputStyle.password__block} style={{marginBottom: margin}}>
            <label htmlFor="password__input" className={inputStyle.data__label}> Password: </label>
            <div className={inputStyle.password__area}>
                <div className={inputStyle.password__image__area}>
                    <Image src={KeyImage} alt="eye image" className={inputStyle.input__symbol}/>
                </div>
                <input type="password" id="password__input" className={inputStyle.password__input} onChange={(event)=> changeValue(event)} required value={value}/>
            </div>            
        </div>  
    );
}