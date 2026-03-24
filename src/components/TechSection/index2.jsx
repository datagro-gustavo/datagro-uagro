'use client'

import React, { use, useContext, useEffect, useState } from "react";
import { getSessionConfig } from "../../utils/getSessionConfig";
import CardNews from "../CardNews";
import styled from "styled-components";
import { NewsContext } from "../../context/news";

const Clean = styled.div`
	height:${props => props.scrolled ? "13.2rem" : "0"};

	@media screen and (max-width:920px){

	height:${props => props.scrolled ? "5.2rem" : "0"};
		
	}`;

const TechSectionTemp = ({ mx, px, name, home = 0 }) => {

  const isHome = location.pathname === "/"
  const isNews = location.pathname.startsWith("/news");

  const config = getSessionConfig("tech");
  const { byCategory, setCategory, category, notice, byCategoryTem } = useContext(NewsContext)
  // TODO: Busco pela categoria no proprio componente, 
  // sera que existe outra alternativa ja que no context temos uma global?
  // talvez


  // crosscheck entre TODOS os cards da config e TODAS as notices
  const noticeList = Array.isArray(byCategoryTem) ? byCategoryTem : [];

  const sortedNotices = noticeList.sort((a, b) => (b.pin || 0) - (a.pin || 0));

  console.log("=========")
  console.log(sortedNotices)
console.log("=========")
  const title =
    sortedNotices?.[0]?.markets?.[0]?.title || "";

  config.qtd_cards = config.qtd_cards.map((card, i) => {
    const notice = sortedNotices[i];

    const categories =
      notice?.matters?.map(m => m?.title).filter(Boolean) || [];

    return {
      ...card,
      ...(card?.priority === 'high' && { description: notice?.description }),
      ...(notice?.title && { title: notice?.title }),
      ...(notice?.imageUrl && { imageUrl: notice?.imageUrl }),
      href: notice?.url,
      category: categories.join(' / ') || undefined,
      categoryId: notice?.matters?.[0]?.id || undefined,
      slug: notice?.slug,
      pin: notice?.pin || 0,
      noticeId: sortedNotices?.[0]?.markets?.[0]?.id,
      notice,
      id: notice?.id,
    };
  });


  return (
    <section style={{ marginTop: "0rem" }} className={` xl:max-w-[1280px] 2xl:max-w-[1650px]   mx-auto md:${px} mb-9`}>
      <header className="mb-0">
        
        {name
          ?
          <h2 className="text-2xl md:text-3xl  font-medium mb-6 "> {name}</h2>

          : <h2 className="text-2xl md:text-3xl font-medium mb-6 ">{title}</h2>}
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

export default TechSectionTemp;
