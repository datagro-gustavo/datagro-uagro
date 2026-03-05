'use client'


import { motion } from "framer-motion";

import React, { useContext, useEffect } from "react";

/* CONTEXT */
import { NewsContext } from "@/context/news";

/* COMPONENTS */
import { NavBar } from "@/components/NavBar/NavBar";
import { Aside } from "@/components/Aside";
import { ToastContainer } from "react-toastify";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";

import HeroSection from "@/components/HeroSection";
import MaisLidasSection from "@/components/MaisLidasSection";
import TechSection from "@/components/TechSection";
import InfiniteScroll from "@/components/InfiniteScroll";

const SectionCultura = ({ id, link }) => {
    const {
        setCulture,
        setPageType,
        linkColor
    } = useContext(NewsContext);

useEffect(() => {
    if (!id) return;

    setPageType("culture");
    setCulture(id);
}, [id, setPageType, setCulture]);

    return (
        <main>
            <ToastContainer style={{ zIndex: "999999999999" }} />

            <motion.main
                initial={{ opacity: 1, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ willChange: "transform, opacity" }}
            >

                <NavBar />
                <section className="flex xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto px-6 py-6">
                    <div className="flex flex-col w-full xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto px-6 py-6">

                        <div className="w-full xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto px-0 mb-9">
                            <span
                                style={{ background: linkColor?.color }}

                                className="px-2 py-3 flex text-[#FFFFFF] rounded-md text-[19px] cursor-pointer text-xs font-semibold uppercase tracking-wide"
                            >
                                {link}
                            </span>

                        </div>

                        <MaisLidasSection name="Outras Notícias" layout="culture-section" />
                        <TechSection />
                    </div>
                    <div className="hidden md:flex flex-col  border border-r-0 ml-5 mr-5 border-slate-500 h-[auto]" />
                    <Aside />
                </section>
                <InfiniteScroll />
            </motion.main>
            <Footer />
            <Sidebar />
        </main>

    )
}

export default SectionCultura