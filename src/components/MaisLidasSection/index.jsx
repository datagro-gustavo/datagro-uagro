'use client'

import React, { useContext, useEffect } from "react";
import { getSessionConfig } from "../../utils/getSessionConfig";
import CardNews from "../CardNews";
import { NewsContext } from "../../context/news";

const MaisLidasSection = ({ name }) => {
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
          slug: notice.slug,
          noticeId: notice?.markets?.[0]?.id,
          categoryId: notice?.matters?.[0]?.id,
          category: notice?.matters?.[0]?.title,
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
          noticeId: mainNotice?.markets?.[0]?.id,
          id: mainNotice?.id,
          slug: mainNotice?.slug,
          category: mainNotice?.matters?.[0]?.title ?? card.category,
          categoryId: mainNotice?.matters?.[0]?.id ?? card.categoryId,
          imageUrl: mainNotice.imageUrl ?? card.imageUrl,
        };
      }

      // 3) Caoluna 2 com 3 itens
      if (card.id === "ml-col2-stack") {
        const items = restNotices.slice(0, 3).map((notice, i) => ({
          id: notice.id ?? i,
          href: notice.url,
          slug: notice.slug,
          noticeId: notice?.markets?.[0]?.id,
          title: notice.title,
          imageUrl: notice.imageUrl,
          category: notice?.matters?.[0]?.title,
          categoryId: notice?.matters?.[0]?.id,

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
          noticeId: notice?.markets?.[0]?.id,
          slug: notice.slug,
          title: notice.title,
          imageUrl: notice.imageUrl,
          category: notice?.markets?.[0]?.title,
          categoryId: notice?.matters?.[0]?.id,
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
    <section className="mb-9">
      <header className="mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold">
          {name ? name : config.title}
        </h2>
      </header>

      <div className={config.flex}>
        {cards.map((card) => (
          <CardNews key={card?.id} {...card} />
        ))}
      </div>
    </section>
  );
};

export default MaisLidasSection;
