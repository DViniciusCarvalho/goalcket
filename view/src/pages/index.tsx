import React from "react";
import Header from "@/components/common/header/Header";
import HeroSection from "@/components/homepage/hero/HeroSection";
import MainContent from "@/components/homepage/main/MainContent";
import Footer from "@/components/common/footer/Footer";
import { Props } from "@/types/props";

export default function Home() {

    const homepageHeaderProps: Props.HeaderProps = {
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