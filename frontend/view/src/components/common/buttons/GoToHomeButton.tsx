import goToHomeStyle from "@/styles/common/buttons/GoToHomeButton.module.css";
import Link from "next/link";


export default function GoToHomeButton(){
    return(
        <Link href={"/"} className={goToHomeStyle.go__to__home}>
            <div className={goToHomeStyle.arrow__button__line__one}/>
            <div className={goToHomeStyle.arrow__button__line__two}/>
            <p className={goToHomeStyle.button__description}> Home </p>
        </Link>
    );
}