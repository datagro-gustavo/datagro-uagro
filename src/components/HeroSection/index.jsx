'use client'
import { useRouter } from "next/navigation";

// src/components/HeroSection.jsx
// Sessão independente: lê SOMENTE sua própria config ("hero")
// e renderiza os cards conforme a lista qtd_cards.

import React, { use, useContext, useEffect } from "react";
import styled from "styled-components";
import { getSessionConfig } from "@/utils/getSessionConfig";
import { NewsContext } from "@/context/news";
import CardNews from "../CardNews";


const Clean = styled.div`
	height:${props => props.scrolled ? "14.8rem" : "0"};

	@media screen and (max-width:920px){

	height:${props => props.scrolled ? "5.2rem" : "0"};
		
}`;


const HeroSection = ({ scrolled, layout, fixed, px = '', marketId }) => {

    const config = getSessionConfig(layout);
    const { notices } = useContext(NewsContext)
    if (!config) return null;

    // crosscheck entre TODOS os cards da config e TODAS as notices
    const noticeList = Array.isArray(notices) ? notices : [];

    const sortedNotices = noticeList.sort((a, b) => (b.pin || 0) - (a.pin || 0));

    config.qtd_cards = config.qtd_cards.map((card, i) => {

        const notice = sortedNotices[i];

        const categories =
            notice?.matters?.map((m) => m?.title).filter(Boolean) || [];

        const categoryId = notice?.matters?.[0]?.id;

        let listItems = card.listItems || [];

        // se for o layout horizontal-culture, monta os listItems com outras notícias

        if (card.layout === "horizontal-culture" || layout == "horizontal-culture") {

            const notice = sortedNotices.filter(item => item.markets[0].id == marketId)

            const extraNotices = notice.slice(0, 4)


            listItems = extraNotices.map((n, idx) => {
                if (!n) return null;


                return {
                    id: `${card.id}-extra-${idx}`,
                    title: n.title,
                    slug: n.slug,
                    href: n.url,
                    noticeId: n.id
                };
            }).filter(Boolean);

            if (!listItems.length && card.listItems?.length) {
                listItems = card.listItems;
            }


            return {
                ...card,
                ...(card?.priority === "high" && notice?.description != null && notice?.description !== "" && { description: notice?.description }),
                imageUrl: notice[0]?.imageUrl,
                href: notice?.url,
                category: categories.join(" / ") || undefined,
                categoryId: categoryId || undefined,
                pin: notice?.pin || 0,
                slug: notice?.slug,
                notice,
                listItems,
                id: notice?.id,
                noticeId: notice?.markets?.[0]?.id,
                lock: notice?.importanceLevel,
                // chart: notice?.char?.length > 0 ? notice?.chart : {cod: "D_PEPR_SP_BR", ini: "2025-11-01", end: "", shape: 1 },
                chart: notice?.chart?.length > 0 ? notice?.chart : null,

                //            video: notice?.video ? notice?.video : "https://www.youtube.com/embed/WiZxHaTpgNQ?si=SlviJxRDLSE9s53c"
                video: notice?.video ? notice?.video : null

            };
        }
        return {
            ...card,
            ...(card?.priority === "high" && notice?.description != null && notice?.description !== "" && { description: notice?.description }),
            ...(notice?.title != null && notice?.title !== "" && { title: notice?.title }),
            ...(notice?.imageUrl != null && notice?.imageUrl !== "" && { imageUrl: notice?.imageUrl }),
            href: notice?.url,
            category: categories.join(" / ") || undefined,
            categoryId: categoryId || undefined,
            pin: notice?.pin || 0,
            slug: notice?.slug,
            notice,
            listItems,
            id: notice?.id,
            noticeId: notice?.markets?.[0]?.id,
            lock: notice?.importanceLevel,
            // chart: notice?.chart?.length > 0 ? notice?.chart : {cod: "D_PEPR_SP_BR", ini: "2025-11-01", end: "", shape: 1 },
            chart: notice?.chart?.length > 0 ? notice?.chart : null,

            //            video: notice?.video ? notice?.video : "https://www.youtube.com/embed/WiZxHaTpgNQ?si=SlviJxRDLSE9s53c"
            video: notice?.video ? notice?.video : null

        };
    });


    return (
        <section className={` xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto  mt-3  md:${px} mb-6`}>

            <header className="mb-0">
            </header>

            {/* Container com o layout definido na config.flex */}
            {fixed == false ? <></> : <Clean scrolled={scrolled} />}

            <div className={config.flex}>

                {/* Mapeamos APENAS os cards desta sessão */}
                {config.qtd_cards.map((card) => (
                    <CardNews key={card.id} {...card} />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
