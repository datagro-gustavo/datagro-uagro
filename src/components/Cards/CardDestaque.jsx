'use client'

import Image from "next/image";
import React, { useState } from "react";

export const CardDestaque = ({
  cultura = false,
  compactInitial = false,

  // card simples (cultura=false)
  imagem,
  categoria,
  titulo,
  texto,
  height = "380px",
  aspect = null,

  // seção (cultura=true)
  tituloLista = "Destaques",
  main,
  grid,
}) => {
  const [compact, setCompact] = useState(compactInitial);

  // ----- DUMMY DATA (usado se não vier via props) -----
  const dummyMain = {
    imagem: "https://picsum.photos/960/540?random=11",
    titulo:
      "Gestoras de crédito privado desafiam bancos por empréstimos a clubes da Premier League",
    descricao:
      "Equipes britânicas recorrem a dívidas após um recorde em contratações e taxas que ultrapassam £100 milhões por talentos.",
    links: [
      "Dubai supera NY e Londres como melhor cidade para ultra-ricos",
      "Hedge fund ícone de Wall St. avança com a sucessão",
      "Petrobras: 1º poço na Margem Equatorial deve durar cinco meses",
    ],
  };


  const mainData = main ?? dummyMain;

  // ---------- MODO CARD HOME ----------
  if (!cultura) {
    return (
      <div className="cursor-pointer">
        <div
          className="w-full aspect-[16/10] md:aspect-[16/10]"
        >
          <Image
            src={imagem ?? "https://picsum.photos/800/450?random=5"}
            alt={titulo ?? "Notícia"}
            width={30} height={30}
            className="block w-full h-full object-cover"
          />
        </div>

        <div className="hover:underline mt-4">
          <span>{categoria ?? "Categoria"}</span>
        </div>

        <div className="hover:underline">
          <div>
            <span className="font-bold text-xl">
              {titulo ?? "Título de exemplo do card"}
            </span>
          </div>
          <div className="text-md break-words w-full">
            <span>
              {texto ??
                "Descrição curta de exemplo para o card de destaque responsivo."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ---------- MODO CULTURA ----------
  return (
    <section className="max-w-6xl mx-auto py-2">


      {/* Linha principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <div className="w-full aspect-[16/10] md:aspect-[16/14]">
            <Image
              src={mainData.imagem}
              alt={mainData.titulo}
              width={30} height={30}
              className="block w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-md md:text-xl font-bold leading-snug hover:underline cursor-pointer">
            {mainData.titulo}
          </h1>

          {!compact && mainData.descricao && (
            <p className="text-sm text-gray-700 mt-3">{mainData.descricao}</p>
          )}

          {!compact && Array.isArray(mainData.links) && mainData.links.length > 0 && (
            <ul className="mt-4 space-y-3">
              {mainData.links.map((t, i) => (
                <div className="m-0">
                  <div className="border border-emerald-400 w-[5%]" />
                  <li key={i}>
                    <a href="#" className="text-sm text-black font-semibold hover:underline">
                      {t}
                    </a>
                  </li>
                </div>
              ))}
                </ul>
              )}
            </div>
      </div>

    </section>
  );
};
