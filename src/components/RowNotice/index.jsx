'use client'

// src/components/HeroSection.jsx
// Sessão independente: lê SOMENTE sua própria config ("hero")
// e renderiza os cards conforme a lista qtd_cards.

import React, { use, useContext } from "react";

import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

import { getSessionConfig } from "@/utils/getSessionConfig";
import CardNews from "../CardNews";
import { NewsContext } from "@/context/news";


const Clean = styled.div`
    height:${props => props.scrolled ? "13.2rem" : "0"};
 
    @media screen and (max-width:920px){
 
    height:${props => props.scrolled ? "5.2rem" : "0"};
       
    }
 
`;


const RowSection = ({ scrolled, name, noticeProp, title, more, index, px }) => {
    // const navigate = useNavigate()
    const { notices } = useContext(NewsContext)
    const config = getSessionConfig("rowsection");

    const headerTitle = !title !== null && index === 0 && !name ? title : "Mais notícias";

    if (!config) return null;

    const noticeList = Array.isArray(noticeProp) ? noticeProp : [];

    const sortedNotices = notices.sort((a, b) => (b.pin || 0) - (a.pin || 0));

    config.qtd_cards = config.qtd_cards.map((card, i) => {
        const notice = sortedNotices[i];

        const categories =
            notice?.markets?.map(m => m?.title).filter(Boolean) || [];

        return {
            ...card,
            ...(card?.priority === 'high' && { description: notice?.description }),
            ...(notice?.title && { title: notice?.title }),
            ...(notice?.imageUrl && { imageUrl: notice?.imageUrl }),
            href: notice?.url,
            category: categories.join(' / ') || undefined,
            pin: notice?.pin || 0,
            noticeId: notice?.markets?.[0]?.id,
            notice,
            id: notice?.id
        };
    });

    return (
        <section className={` xl:max-w-7xl 2xl:max-w-412.5 px-6  mx-auto `}>
            {headerTitle && (
                <header className="mb-0">
                    <h2 className="text-2xl md:text-3xl font-medium mb-6 ">
                        {headerTitle}
                    </h2>
                </header>
            )}
            <div className={config.flex}>
                {config.qtd_cards.map((card, idx) => (
                    <CardNews key={idx} {...card} />
                ))}
            </div>


        </section>
    );
};

export default RowSection;