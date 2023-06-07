import React from "react";
import footerStyles from "../../../styles/common/footer/Footer.module.css";


export default function Footer(){
    return (
        <footer className={footerStyles.footer}>
            Website made using React.js and Next.js in the front-end and python with FastAPI in the back-end.
        </footer>
    );
}