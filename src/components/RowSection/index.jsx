'use client'

// src/components/HeroSection.jsx
// Sessão independente: lê SOMENTE sua própria config ("hero")
// e renderiza os cards conforme a lista qtd_cards.

import React, { use, useContext } from "react";

import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

import { getSessionConfig } from "@/utils/getSessionConfig";
import CardNews from "../CardNews";


const Clean = styled.div`
	height:${props => props.scrolled ? "13.2rem" : "0"};

	@media screen and (max-width:920px){

	height:${props => props.scrolled ? "5.2rem" : "0"};
		
	}

`;


const RowSection = ({ scrolled, name, noticeProp, title, more, index }) => {
    // const navigate = useNavigate()
    const config = getSessionConfig("rowsection");

    const headerTitle = !title !== null && index === 0 && !name ? title : null

    if (!config) return null;
    if (!Array.isArray(noticeProp) || noticeProp.length === 0) return null;

    const noticeList = Array.isArray(noticeProp) ? noticeProp : [];

    const sortedNotices = noticeList.sort((a, b) => (b.pin || 0) - (a.pin || 0));

    config.qtd_cards = config.qtd_cards.map((card, i) => {
        const notice = sortedNotices[i];

        const categories =
            notice?.matters?.map(m => m).filter(Boolean) || [];


        const categoryId = notice?.matters?.[0]?.id;
        const categoryName = notice?.matters?.[0]?.title;


        return {
            ...card,
            ...(card?.priority === 'high' && { description: notice?.description }),
            ...(notice?.title && { title: notice?.title }),
            ...(notice?.imageUrl && { imageUrl: notice?.imageUrl }),
            href: notice?.url,
            slug: notice?.slug,
            categoryId: categoryId,
            categoryName: notice?.matters?.[0]?.title || notice?.markets?.[0]?.title,
            pin: notice?.pin || 0,
            noticeId: notice?.markets?.[0]?.id,
            notice,
            id: notice?.id
        };
    });

    return (
        <section style={{ marginTop: "2rem" }} className="xl:max-w-7xl  2xl:max-w-412.5 mx-auto px-7 md:px-12">
            {headerTitle && (
                <header className="mb-0">
                    <h2 className="text-2xl md:text-3xl font-medium mb-6 ">
                        {headerTitle}
                    </h2>
                </header>
            )}
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

export default RowSection;
