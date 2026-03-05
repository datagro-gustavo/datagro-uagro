'use client'

// src/components/HeroSection.jsx
// Sessão independente: lê SOMENTE sua própria config ("hero")
// e renderiza os cards conforme a lista qtd_cards.

import React, { use, useContext, useEffect, useState } from "react";
import styled from "styled-components";


import { getSessionConfig } from "@/utils/getSessionConfig";
import { NewsContext } from "@/context/news";
import CardNews from "../CardNews";

const Clean = styled.div`
	height:${props => props.scrolled ? "13.2rem" : "0"};

	@media screen and (max-width:920px){

	height:${props => props.scrolled ? "5.2rem" : "0"};
		
	}

`;


const RowSectionCategory = ({ scrolled, name }) => {
    // const navigate = useNavigate()
    // const location = useLocation()
    const isHome = window.location.pathname === "/"
    const config = getSessionConfig("rowsectioncategory");
    const { setCategoryRowSection, byCategoryRowSection } = useContext(NewsContext)
    // TODO: Busco pela categoria no proprio componente, 
    // sera que existe outra alternativa ja que no context temos uma global? 

    if (!config) return null;
    if (isHome) setCategoryRowSection(config?.marketId)

    const noticeList = Array.isArray(byCategoryRowSection) ? byCategoryRowSection : [];

    const sortedNotices = noticeList.sort((a, b) => (b.pin || 0) - (a.pin || 0));
    const title =
        sortedNotices?.[0]?.markets?.[0]?.title || "";

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
            id: notice?.id
        };
    });

    return (
        <section style={{ marginTop: "2rem" }} className=" xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto px-6">
            <Clean scrolled={scrolled} />

            <header className="mb-0">
                {!name ? <></> : <h2 className="text-2xl md:text-3xl font-medium mb-6 ">{title}</h2>}
            </header>

            {/* Container com o layout definido na config.flex */}
            <div className={config.flex}>
                {/* Mapeamos APENAS os cards desta sessão */}
                {config.qtd_cards.map((card) => (
                    <CardNews key={card.id} {...card} />
                ))}
            </div>
        </section>
    );
};

export default RowSectionCategory;
