'use client'

import React, { useContext, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* IMAGES  */
import banner from '../../assets/banners/banner.png'

/* THEMES */
import { ThemeContext } from "@/context/theme";

/* COMPONENTS */
import { NavBar } from "../../components/NavBar/NavBar";
import { Banner } from "../../components/Banner/Banner";
import { Footer } from "../../components/Footer";
import { Aside } from "../../components/Aside";

import { MainChart } from "../../components/MainChart";
import ScrollToTop from "../../components/ScrollToTop";
import { ModalSign } from "../../components/ModaSign";
import BackgroundModal from "../../components/BackgroundModal";
import HeroSection from "../../components/HeroSection";
import TechSection from "../../components/TechSection";
import RowSection from "../../components/RowSection";
import { TvDatagro } from "../../components/TvDatagro/TvDatagro";
import MaisLidasSection from "../../components/MaisLidasSection";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "../../components/Link";
import styled from "styled-components";
import { NewsContext } from "@/context/news";
import InstagramStories from "../../components/InstagramStories";
import BackgroundInstagram from "../../components/BackgroundInstagram";
import { InstaGramContext } from "@/context/instagram";
import { Sidebar } from "@/components/Sidebar";

const SquareSkeleton = styled(Skeleton)`
    width: 296px !important;
    height: 166px !important;
    
    @media screen and (max-width:920px){
        width: 90% !important;
        height: 218px !important;

    }

    @media screen and (min-width: 1650px) {
        width: 360px !important;
        height: 218px !important;
    }


`;

const BoxSkeleton = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  flex-direction: row;
  justify-content: center;
  gap: 20px; // opcional
  margin-bottom: 1.5rem;
  
@media screen and (max-width:920px){
  grid-template-columns: 1fr !important;
  justify-content: center;
  align-items: center;
  width: 100% !important;
}


`;
const Clean = styled.div`
    height:5rem;

`
const Border = styled.div`
        @media screen and (max-width:920px){
        display: none;
    }
`
const BannerEl = styled.img``

export default function Home() {
    const { theme } = useContext(ThemeContext);
    const { modalInstagram } = useContext(InstaGramContext)
    const [scrolled, setScrolled] = useState(false);

    const {
        rowNotices,
        loadMoreRowNotices,
        setPageType,
        hasMoreRows,
        loadingRows,
        setCulture,
    } = useContext(NewsContext);

    const CHUNK_SIZE = 8;

    // monta os chunks
    const chunks = [];
    for (let i = 0; i < rowNotices.length; i += CHUNK_SIZE) {

        chunks.push(rowNotices.slice(i, i + CHUNK_SIZE));
    }

    const handleScroll = () => setScrolled(window.scrollY >= 280);

    useEffect(() => {
        setPageType("home");
        setCulture(undefined); // garante que é geral
    }, [setPageType, setCulture]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main
            style={{
                background: theme ? "white" : "black",
                color: theme ? "black" : "white",
            }}>
            <ScrollToTop />
            <ModalSign />
            <Sidebar />
            <BackgroundModal />
            <NavBar
                style={{ color: theme ? "black" : "white s" }}
                props={"max-w-7xl mx-auto px-6"}
            />
            {modalInstagram
                ?
                <>
                    <BackgroundInstagram />
                    <InstagramStories />
                </>
                :
                <></>
            }

            <HeroSection scrolled={scrolled} layout={"hero"} px={'px-6'} />

            <div className="flex xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto px-6 py-7">
                <div className="w-full" style={{ color: theme ? "black" : "white" }}>
                    <MaisLidasSection />
                    <TvDatagro />
                    <BannerEl className="mb-9" src={banner} />
                </div>
                <Border className="hidden md:flex border border-r-0 ml-5 mr-5 border-slate-500 h-[auto]" />
                <Aside />
            </div>

            <TechSection px={"px-6"} />
            {/* <MainChart props={"mb-9 mt-9"} /> */}
            <Clean />

            <InfiniteScroll
                dataLength={rowNotices.length}
                next={loadMoreRowNotices}
                style={{ paddingBottom: "60px" }}

                hasMore={hasMoreRows}
                loader={
                    loadingRows && (
                        <BoxSkeleton>
                            {[...Array(8)].map((_, i) => (
                                <SquareSkeleton key={i} />
                            ))}
                        </BoxSkeleton>
                    )
                }
            >
                {chunks.map((group, index) => (
                    <div key={index} style={{ marginBottom: "40px" }}>
                        <RowSection
                            scrolled={scrolled}
                            noticeProp={group}
                            name={false}
                            more={true}
                            index={index}
                            title={'Mais Notícias'}
                        />
                        <Banner props={"mb-9 mt-9"} />
                    </div>
                ))}
            </InfiniteScroll>

            <Footer />
            <Link scrolled={scrolled} />
        </main>
    );
};
