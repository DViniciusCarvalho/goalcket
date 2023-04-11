import React from "react";
import Header from "@/components/common/header/Header";
import AboutMainContent from "@/components/about/AboutMainContent";
import Footer from "@/components/common/footer/Footer";
import { HeaderProps } from "@/types/types";

export default function About() {

    const aboutHeaderProps: HeaderProps = {
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