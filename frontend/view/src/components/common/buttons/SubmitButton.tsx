import buttonStyle from "@/styles/common/buttons/Button.module.css";
import { Props } from "@/types/props";


export default function Button({ message, handleSubmitButtonClick }: Props.SubmitButtonProps){
    return (
        <input type="submit" value={message} className={buttonStyle.button}
        onClick={(event) => handleSubmitButtonClick(event)} id="register__button"/>
    );
}