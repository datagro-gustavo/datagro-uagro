'use client'

import React, { use, useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { useRouter } from "next/navigation";


import { getSessionConfig } from "@/utils/getSessionConfig";
import { ColumnContext } from "@/context/column";
import { NewsContext } from "@/context/news";
import CardNews from "../CardNews";

const Clean = styled.div`
	height:${props => props.scrolled ? "13.2rem" : "0"};

	@media screen and (max-width:920px){

	height:${props => props.scrolled ? "5.2rem" : "0"};
		
	}`;

const TechColumnist = ({ mx, px, name, home = 0, columnistId }) => {

    const router = useRouter()

    const { columnistHistorySection } = useContext(ColumnContext)

    const isHome = window.location.pathname === "/"
    const isNews = window.location.pathname.startsWith("/news");

    const config = getSessionConfig("techcolumns");
    const { byCategory, setCategory, category, notice } = useContext(NewsContext)

    // TODO: Busco pela categoria no proprio componente, 
    // sera que existe outra alternativa ja que no context temos uma global?
    // talvez

    if (!config) return null;
    if (isHome) setCategory(config?.marketId)
    if (isNews) setCategory(notice?.markets?.[0].id)

    // crosscheck entre TODOS os cards da config e TODAS as notices

    const sortedNotices = columnistHistorySection?.sort((a, b) => (b.pin || 0) - (a.pin || 0));


    if (!sortedNotices) return false

    const title = sortedNotices?.[0]?.markets?.[0]?.title || "";
    const columnistIdArticle = sortedNotices?.[0]?.columnistId || ""
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
            category: notice?.category || undefined,
            pin: notice?.pin || 0,
            notice,
            id: notice?.id
        };
    });


    return (
        <section style={{ marginTop: "0rem" }} className={` xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto ${px} mb-9`}>
            <header className="mb-0">
                {name
                    ?
                    <h2 className="text-2xl md:text-3xl font-medium mb-6 "> {name}</h2>

                    : <h2 className="text-2xl md:text-3xl font-medium mb-6 ">{title}</h2>}
            </header>

            {/* Container com o layout definido na config.flex */}
            <div className={config.flex}>
                {/* Mapeamos APENAS os cards desta sessão */}
                {config.qtd_cards.map((card) => (
                    <CardNews key={card.id} {...card} article={true} columnistId={columnistIdArticle} />
                ))}
            </div>
        </section>
    );
};

export default TechColumnist;
