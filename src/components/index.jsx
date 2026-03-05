'use client'

import Image from "next/image";
// src/components/CardNews.jsx
// Card de notícia inspirado em Bloomberg Línea:
// - Imagem grande no topo (aspect ratio consistente)
// - Categoria em etiqueta (kicker)
// - Manchete forte
// - Resumo curto opcional
// - Meta/data discreta
// - Variação de borda/sombra conforme prioridade

import React from "react";

// Utilitário interno: traduz prioridade em classes visuais
const priorityClasses = {
  high: "ring-1 ring-black/10 shadow-lg",
  medium: "ring-1 ring-black/5 shadow-md",
  low: "ring-1 ring-black/5",
};

const aspectClass = (ratio) => {
  // Tailwind moderno possui classes aspect-[w/h]; aqui tratamos strings comuns
  if (!ratio) return "aspect-[16/9]";
  const safe = ratio.replace(":", "/");
  return `aspect-[${safe}]`;
};

const CardNews = ({
  priority = "low",
  width = "w-full",
  height, // opcional, preferimos aspect para responsividade
  imageUrl,
  category,
  headline,
  summary,
  dateLabel,
  href = "#",
  imageAspectRatio = "16/9",
}) => {
  return (
    <article
      className={[
        "group bg-white rounded-2xl overflow-hidden transition hover:-translate-y-[2px] duration-200",
        priorityClasses[priority] || priorityClasses.low,
        width,
      ].join(" ")}
    >
      {/* Imagem no topo com aspecto consistente */}
      <a href={href} className="block">
        <div className={["w-full", aspectClass(imageAspectRatio)].join(" ")}>
          <Image
            src={imageUrl}
            alt={headline}
            width={30}
            height={30}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </a>

      {/* Corpo do card */}
      <div className="p-4 md:p-5">
        {/* Categoria estilo "pílula" */}
        {category && (
          <div className="mb-2">
            <span className="inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-700">
              {category}
            </span>
          </div>
        )}

        {/* Manchete forte */}
        <h3 className="text-xl md:text-2xl font-extrabold leading-snug text-neutral-900">
          <a
            href={href}
            className="hover:underline decoration-2 underline-offset-2"
          >
            {headline}
          </a>
        </h3>

        {/* Resumo curto (opcional) */}
        {summary && (
          <p className="mt-2 text-sm md:text-base text-neutral-700 line-clamp-3">
            {summary}
          </p>
        )}

        {/* Meta (data/etiqueta) discreta */}
        {dateLabel && (
          <div className="mt-3 text-xs text-neutral-500">{dateLabel}</div>
        )}
      </div>
    </article>
  );
};

export default CardNews;
