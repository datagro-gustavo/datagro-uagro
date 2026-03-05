'use client'

import React, { useContext, useEffect, useMemo, useRef } from "react";
import anychart from "anychart";
import { Lock, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";


import { QuadrosContext } from "@/context/quadros";
import { formatDate } from "@/utils/formatDate";
import { AnalysisContext } from "@/context/analysis";
import { PricesContext } from "@/context/prices";
import { RenderTables } from "./renderTables";

export const MainChart = () => {
  const chartContainerRef = useRef(null);
  const containerRef = useRef(null);

  const chartInstanceRef = useRef(null);
  const { quadrosHome } = useContext(QuadrosContext)
  const { historicalSeries, lastQuote } = useContext(PricesContext)
  const { get, data, dataBanner } = useContext(AnalysisContext)
  const color = (n) => (n >= 0 ? "text-[#98BF0E]" : "text-red-600");
  const fmtPct = (n) => `${n >= 0 ? "+" : ""}${Number(n).toFixed(2)}%`;

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = anychart.area();

    chart.background().fill("#fff");
    chart.padding(10, 10, 0, 0);
    chart.legend(false);

    chart.yAxis().labels().format(function () {
      const v = this.value;
      return v;
    });

    chart.xAxis().labels().rotation(0);

    // 🔹 monta os dados: data no eixo X, valor no Y
    const data = historicalSeries?.map(p => ({
      x: p.y,
      value: p.x,
    }));

    const s = chart.line(data);
    s.stroke("#10b935ff", 2);
    s.hovered().markers(true).type("circle").size(4);

    // const values = historicalSeries?.map(p => Number(p.x));
    // const min = Math.min(...values);
    // const max = Math.max(...values);

    // chart.yScale().minimum(min);
    // chart.yScale().maximum(max);

    // 🔹 cria um scale DateTime separado e configura o gap
    const xScale = anychart.scales.dateTime();
    xScale.minimumGap(0);
    xScale.maximumGap(0);
    chart.xScale(xScale);

    chart.container(containerRef.current);
    chart.draw();

    return () => chart.dispose();
  }, [historicalSeries]);

  return (
    <div className=" xl:max-w-[1280px] 2xl:max-w-[1650px] mx-auto  px-4 ">
      <div className="w-full  mx-auto ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-xl font-bold text-foreground whitespace-nowrap">
              COTAÇÕES

            </h1>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            <span onClick={() => {
              window.location.href = "uagro/quotes/"
            }} className="text-secondary hover:underline hover:cursor-pointer flex items-center gap-1 text-sm truncate">
              Veja mais
            </span>
          </div>
        </div>

        <div className="shadow-sm border border-border p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 ">
              {/** NOME DO ATIVO */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold font-metropolis text-foreground">{lastQuote?.[0]?.name} </h2>
                <span className="text-sm text-muted-foreground">
                  {lastQuote?.[0]?.long}
                </span>
              </div>
            
            </div>
            <div className="flex items-center gap-2 ">
              {/** DATA DA COTAÇÃO */}
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground">
                  Atualizado em
                </span>
                <h2 className="text-lg font-bold font-metropolis text-foreground">{formatDate(lastQuote?.[0]?.date)}</h2>
              </div>
              </div>
              
          </div>

          {/* 3 Cards com descrição*/}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Título do Card 1</h3>
              <p className="text-xs text-muted-foreground">
              </p>
            </div>
            <div className="bg-gray-100 border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Título do Card 2</h3>
              <p className="text-xs text-muted-foreground">
              </p>
            </div>
            <div className="bg-gray-100 border border-border p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Título do Card 3</h3>
              <p className="text-xs text-muted-foreground">
              </p>
            </div>
          </div> */}

          {/* esquerda (gráfico) / direita (tabelas) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
            {/* LEFT */}
            <div className="min-w-0">
              {/* <div className="flex flex-wrap items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-sm text-foreground">Best of Buffett</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
                  <span className="text-sm text-foreground">S&P 500 Pure Value</span>
                </div>
              </div> */}

              <div className="flex flex-col sm:flex-row gap-3">
                <div ref={containerRef} className="w-full sm:flex-1 h-[220px] sm:h-[350px]" />
                {/* <div className="w-full sm:w-40 flex flex-row sm:flex-col justify-between text-xs border border-border rounded-md p-3">
                  <span className="text-xs font-medium text-success">+440.7%</span>
                  <span className="text-xs font-medium text-success">+147.2%</span>
                  <span className="text-xs text-foreground">0%</span>
                  <span className="text-xs text-destructive">-200%</span>
                </div> */}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 text-xs">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="border border-border bg-[#e7e5e5] p-3">
                    <p className="text-xs text-muted-foreground mb-1">
                      {i === 0 && "Último"}
                      {i === 1 && "Variação"}
                      {i === 2 && ""}
                    </p>
                    <p className={`text-xs font-bold ${i === 0 ? "text-success" : i === 1 ? "text-success" : "text-success"}`}>
                      {i === 0 && lastQuote?.[0]?.value && (
                        <span className="text-lg">{lastQuote?.[0]?.value}</span>
                      )}
                      {i === 1 && lastQuote?.[0]?.var && (
                        <>
                          <span className={`${color(lastQuote?.[0]?.var)} text-lg`}>{fmtPct(lastQuote?.[0]?.var)}</span>
                        </>
                      )}
                      {i === 2 && ""}
                    </p>
                  </div>
                ))

                }

              </div>
            </div>

            {/* RIGHT (tabelas em row no web) */}
            <div className="min-w-0 w-full h-full">
              {/* Mobile: 1 col | sm: 2 cols | lg(web): 3 cols (row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.values(quadrosHome)?.map((grupo, i) => (
                  <RenderTables key={i} dados={grupo} compact miniHome />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.values(quadrosHome)?.map((grupo, i) => (
                  <RenderTables key={i} dados={grupo} compact miniHome />
                ))}
              </div>

              {/* <button
                type="button"
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Lock className="w-4 h-4" />
                Unlock Strategy
              </button> */}
{/* 
              <div className="mt-6 w-full h-full text-start hidden lg:block">
                <h2 className="mb-4 font-bold">Notícias Relacionadas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {data.slice(0, 3)?.map((item) => (
                    <div
                      key={item?.id || item?.title}
                      className="group relative cursor-pointer overflow-hidden bg-black"
                      onClick={() => handleRedirectToAnalysisPage(item)}
                    >
                      <img
                        src={item?.imageUrl}
                        alt={item?.title}
                        className="h-[180px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-16 bg-black" />

                      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-3 pb-3">
                        <div className="min-w-0">
                          <p
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRedirectToCategoryPage(item?.markets?.[0]?.id, item?.markets?.[0]?.title);
                            }}
                            className="font-metropolis text-[11px] uppercase tracking-wide text-[#94C11F] font-bold hover:underline"
                          >
                            {item?.markets?.[0]?.title}
                          </p>

                          <p className="font-metropolis mt-1 text-[12px] leading-4 text-white line-clamp-2">
                            {item?.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChart;















