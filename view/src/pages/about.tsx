import React from "react";
import Header from "@/components/common/header/Header";
import AboutMainContent from "@/components/about/AboutMainContent";
import Footer from "@/components/common/footer/Footer";
import { Props } from "@/types/props";

export default function About() {

    const aboutHeaderProps: Props.HeaderProps = {
        needChangeBackground: false,
        headerPage: "aboutpage"
    }
    
    return (
        <React.Fragment>
            <Header {...aboutHeaderProps}/>
            <AboutMainContent/>
            <Footer/>
        </React.Fragment>
    );
}