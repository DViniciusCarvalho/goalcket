import React from "react";
import Header from "@/components/common/header/Header";
import HeroSection from "@/components/homepage/hero_section/HeroSection";
import MainContent from "@/components/homepage/main_content/MainContent";
import Footer from "@/components/common/footer/Footer";
import { HeaderProps } from "@/types/types";

export default function Home() {

    const homepageHeaderProps: HeaderProps = {
        needChangeBackground: true,
        headerPage: "homepage"
    }

    return (
        <React.Fragment>
            <Header {...homepageHeaderProps}/>
            <HeroSection/>
            <MainContent/>
            <Footer/>
        </React.Fragment>
    );
}
