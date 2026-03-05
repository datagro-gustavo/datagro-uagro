'use client'

// src/components/HeroSection.jsx
// Sessão independente: lê SOMENTE sua própria config ("hero")
// e renderiza os cards conforme a lista qtd_cards.

import React, { use, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


import { getSessionConfig } from "@/utils/getSessionConfig";
import { NewsContext } from "@/context/news";
import CardNews from "../CardNews";

const Clean = styled.div`
	height:${props => props.scrolled ? "13.2rem" : "0"};

	@media screen and (max-width:920px){

	height:${props => props.scrolled ? "5.2rem" : "0"};
		
	}`;


const CultureSection = ({ scrolled }) => {
    const navigate = useNavigate()
    const config = getSessionConfig("hero");
    const { notices } = useContext(NewsContext)

    if (!config) return null;

    // crosscheck entre TODOS os cards da config e TODAS as notices
    const noticeList = Array.isArray(notices) ? notices : [];

    const sortedNotices = noticeList.sort((a, b) => (b.pin || 0) - (a.pin || 0));

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
            notice,
        };
    });

    return (
        <section className=" xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto px-6">
            <Clean scrolled={scrolled} />

            <header className="mb-0">
            </header>

            {/* Container com o layout definido na config.flex */}
            <div className={config.flex}>
                {/* Mapeamos APENAS os cards desta sessão */}
                {config.qtd_cards.map((card) => (
                    <CardNews onClick={() => navigate("/news")} key={card.id} {...card} />
                ))}
            </div>
        </section>
    );
};

export default CultureSection;
