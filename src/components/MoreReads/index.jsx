'use client'

import React, { useContext, useEffect } from "react";




import { getSessionConfig } from "@/utils/getSessionConfig";
import { NewsContext } from "@/context/news";
import CardNews from "../CardNews";

const MoreReads = () => {
    const config = getSessionConfig("mais-lidas");
    const { mostRead } = useContext(NewsContext);

    if (!config) return null;

    // separa mostRead em [lista, cards]
    const listaNotices = Array.isArray(mostRead?.[0]) ? mostRead[0] : [];
    const cardNotices = Array.isArray(mostRead?.[1]) ? mostRead[1] : [];

    const [mainNotice, ...restNotices] = cardNotices;

    const cards = Array.isArray(config.qtd_cards)
        ? config.qtd_cards.map((card, index) => {
            // 1) Coluna de ranking (Mais lidas em lista)
            if (index === 0) {
                const listItems = listaNotices.map((notice, i) => ({
                    id: notice.id ?? i,
                    href: notice.url,
                    title: notice.title,
                    category: notice?.markets?.[0]?.title,
                    number: i + 1,
                }));

                return {
                    ...card,
                    listItems,
                };
            }

            // 2) Card de destaque principal
            if (card.id === "ml-main-highlight" && mainNotice) {
                return {
                    ...card,
                    title: mainNotice.title ?? card.title,
                    description: mainNotice.description ?? card.description,
                    href: mainNotice.url ?? card.href,
                    category: mainNotice?.markets?.[0]?.title ?? card.category,
                    imageUrl: mainNotice.imageUrl ?? card.imageUrl,
                    id: mainNotice.id
                };
            }

            // 3) Coluna 2 com 3 itens
            if (card.id === "ml-col2-stack") {
                const items = restNotices.slice(0, 3).map((notice, i) => ({
                    id: notice.id ?? i,
                    href: notice.url,
                    title: notice.title,
                    imageUrl: notice.imageUrl,
                    category: notice?.markets?.[0]?.title,
                }));

                return {
                    ...card,
                    items,
                };
            }

            // 4) Coluna 3 com mais 3 itens
            if (card.id === "ml-col3-stack") {
                const items = restNotices.slice(3, 6).map((notice, i) => ({
                    id: notice.id ?? i,
                    href: notice.url,
                    title: notice.title,
                    imageUrl: notice.imageUrl,
                    category: notice?.markets?.[0]?.title,
                }));

                return {
                    ...card,
                    items,
                };
            }

            return card;
        })
        : [];

    return (
        <section className="mb-10">
            <header className="mb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold">
                    {config.title}
                </h2>
            </header>

            <div className={config.flex}>
                {cards.map((card) => (
                    <CardNews key={card.id} {...card} />
                ))}
            </div>
        </section>
    );
};

export default MoreReads;
