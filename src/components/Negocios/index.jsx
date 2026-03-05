'use client'

// src/components/HeroSection.jsx
// Sessão independente: lê SOMENTE sua própria config ("hero")
// e renderiza os cards conforme a lista qtd_cards.

import React from "react";


import { getSessionConfig } from "@/utils/getSessionConfig";
import CardNews from "../CardNews";

const Negocios = () => {
  const config = getSessionConfig("negocios");

  if (!config) return null;

  return (
    <section className="mb-10">
      <header className="mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold">{config.title}</h2>
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

export default Negocios;
