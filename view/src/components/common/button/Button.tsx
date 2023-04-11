import buttonStyle from "@/styles/common/button/Button.module.css";
import { ButtonProps } from "../../../types/types";

export default function Button({ message, handleSubmitButtonClick }: ButtonProps){
    return (
        <input type="submit" value={message} className={buttonStyle.button}
        onClick={(event) => handleSubmitButtonClick(event)} id="register__button"/>
    );
}