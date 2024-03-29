import inputStyle from '@/styles/common/inputs/Inputs.module.css';
import Image from 'next/image';
import UserImage from '../../../../public/assets/user.png';
import { Props } from '@/types/props';


export default function NameInput({ 
    origin, 
    changeValue, 
    value 
}: Props.InputProps){

    return (
        <div 
            className={`
                ${inputStyle.name__block} 
                ${inputStyle[origin]}
                `
            }
        >
            <label 
                htmlFor='name__input' 
                className={inputStyle.data__label}
            > 
                Name: 
            </label>
            <div className={inputStyle.name__area}>
                <div className={inputStyle.name__image__area}>
                    <Image 
                        src={UserImage} 
                        alt='eye image' 
                        className={inputStyle.input__symbol}
                    />
                </div>
                <input 
                    type='text' 
                    name='name' 
                    id='name__input' 
                    className={inputStyle.name__input} 
                    onChange={(event) => changeValue(event)} 
                    required 
                    value={value}
                />
            </div>
        </div>
    );
}