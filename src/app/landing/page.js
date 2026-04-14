
'use client'

import Image from "next/image";

import React, { useState, useEffect, useContext } from "react";

/* OUTHER COMPONENTS */
import styled from "styled-components";

/* NEXT COMPONENTS */

/* IMAGES */
import banner from '../../assets/banners/banner.png'

/* COMPONENTS */
import { NavBar } from "@/components/NavBar/NavBar";
import { Aside } from "@/components/Aside";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { ModalSign } from "@/components/ModaSign";
import { ToastContainer } from "react-toastify";

import HeroSection from "@/components/HeroSection";
import BackgroundModal from "@/components/BackgroundModal";
import MaisLidasSection from "@/components/MaisLidasSection";
import TechSection from "@/components/TechSection";
import TechSectionTemp from "@/components/TechSection/index2";
import InfiniteScroll from "@/components/InfiniteScroll";
import InstagramStories from "@/components/InstagramStories";
import BackgroundInstagram from "@/components/BackgroundInstagram";
import RowNotice from "@/components/RowNotice";
import Clean from "@/components/Clean";
import { BannersContext } from "@/context/banners";


/* STYLED */
const Border = styled.div`
        @media screen and (max-width:920px){
        display: none;
    }
`

export default function Landing() {
    const [scrolled, setScrolled] = useState(false);


    const handleScroll = () => setScrolled(window.scrollY >= 280)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <main >
            <ToastContainer style={{ zIndex: "999999999999" }} />
            <NavBar />
            <Sidebar />
            <BackgroundModal />
            <Clean scrolled={scrolled} />


            <section className=" px-6  md:px-12">

                <HeroSection layout={"hero"} px={'px-6'} />
                <div className="flex xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto md:px-6 py-7">
                    <div className="w-full" >
                        <MaisLidasSection name={"Mais lidas"} />
                        <TechSectionTemp />
                    </div>
                    <Border className="hidden md:flex border border-r-0 ml-5 mr-5 border-slate-500 h-[auto]" />
                    <Aside />
                </div>
            </section>
            <InstagramStories />
            <BackgroundInstagram />
            {/* <TechSection px={'px-6'} /> */}

            <div className="md:px-6">
                <InfiniteScroll page="home" />
            </div>
            <Footer />
            <ModalSign />
        </main >

    );
}
