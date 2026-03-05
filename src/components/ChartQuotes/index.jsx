'use client'

import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



import StockDashboard from "./StockDashboard";
import { QuadrosContext } from "@/context/quadros";
import { PricesContext } from "@/context/prices";

export const ChartQuotes = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const chartRef = useRef(null); // guarda instância do gráfico
    const { quadrosHome } = useContext(QuadrosContext);
    const { historicalSeries, lastQuote, setInterval, interval } = useContext(PricesContext);

    const [chartType, setChartType] = useState("line"); // "line" | "candle"

    const times = ["10D", "1M", "3M", "6M", "1Y", "5Y", "10Y"];

    const fmtPct = (n) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
    const fmtBRL = (n) =>
        n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const color = (n) => (n >= 0 ? "text-[#57b024]" : "text-red-600");
    const bgBadge = (n) =>
        n >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700";

    // useEffect(() => {
    //   if (!containerRef.current || !historicalSeries?.length) return;

    //   if (chartRef.current) {
    //     chartRef.current.dispose();
    //     chartRef.current = null;
    //   }

    //   // [timestamp, preço, volume]
    //   const lineData = historicalSeries
    //     .map((p) => [
    //       new Date(p.y).getTime(),
    //       Number(p.x) || 0,
    //       Number(p.volume) || 0, // se não tiver volume, fica 0
    //     ])
    //     .sort((a, b) => a[0] - b[0]);

    //   if (!lineData.length) return;

    //   if (chartType === "line") {
    //     const chart = anychart.stock();
    //     chartRef.current = chart;

    //     // tabela base
    //     const table = anychart.data.table(0);
    //     table.addData(lineData);

    //     const priceMapping = table.mapAs({ value: 1 });
    //     const volumeMapping = table.mapAs({ value: 2 });

    //     // ====== PLOT PRINCIPAL (PREÇO) ======
    //     const pricePlot = chart.plot(0);
    //     pricePlot.height("80%");

    //     const areaSeries = pricePlot.area(priceMapping);
    //     areaSeries.name(lastQuote?.[0]?.name || "Indicador");
    //     areaSeries.stroke("#2E7CF6", 2);
    //     areaSeries.fill("#2E7CF6", 0.15); // azul claro embaixo da linha

    //     // linha pontilhada de referência (primeiro valor da série)
    //     const ref = lineData[0][1];
    //     const refLine = pricePlot.lineMarker();
    //     refLine.value(ref);
    //     refLine.stroke({
    //       color: "#999999",
    //       thickness: 1,
    //       dash: "4 4",
    //     });

    //     // eixo Y bem justo nos valores
    //     const values = lineData.map((d) => d[1]);
    //     const minVal = Math.min(...values);
    //     const maxVal = Math.max(...values);
    //     const yScale = pricePlot.yScale();
    //     yScale.minimum(minVal);
    //     yScale.maximum(maxVal);

    //     pricePlot.yAxis().labels().format("{%value}");
    //     pricePlot.yAxis().ticks(true);
    //     pricePlot.yGrid().enabled(true);
    //     pricePlot.yGrid().stroke("#f1f1f1");

    //     pricePlot.xGrid().enabled(false);

    //     pricePlot.xAxis().labels().format(function () {
    //       return anychart.format.dateTime(this.value, "HH:mm");
    //       // se for diário/mais longo, pode trocar pra "dd MMM"
    //     });
    //     pricePlot.xAxis().ticks(true);
    //     pricePlot.xAxis().minorTicks(false);

    //     // ====== PLOT VOLUME ======
    //     const volumePlot = chart.plot(1);
    //     volumePlot.height("20%");
    //     volumePlot.yAxis().enabled(false);
    //     volumePlot.xAxis().enabled(false);
    //     volumePlot.yGrid().enabled(false);
    //     volumePlot.background().fill("#ffffff");

    //     const volumeSeries = volumePlot.column(volumeMapping);
    //     volumeSeries.fill("#c6d9f7");
    //     volumeSeries.stroke(null);

    //     volumePlot.yScale().minimum(0);

    //     // ====== CONFIG GERAL ======
    //     chart.background().fill("#ffffff");
    //     chart.legend(false);
    //     chart.padding(10, 30, 20, 80); //top, right, bottom, left

    //     chart.crosshair(true);
    //     chart.crosshair().yLabel().enabled(true);
    //     chart.crosshair().xLabel().enabled(true);

    //     chart.scroller().enabled(true);

    //     const xScale = chart.xScale();
    //     xScale.minimumGap(0);
    //     xScale.maximumGap(0);

    //     chart.container(containerRef.current);
    //     chart.draw();
    //   } else {
    //     // ====== CANDLE (mantive, só desliguei o scroller pra ficar no mesmo estilo) ======
    //     const chart = anychart.stock();
    //     chartRef.current = chart;

    //     const ohlcData = historicalSeries
    //       .map((p) => {
    //         const v = Number(p.x) || 0;
    //         return [
    //           new Date(p.y).getTime(), // x
    //           v,                       // open
    //           v,                       // high
    //           v,                       // low
    //           v,                       // close
    //         ];
    //       })
    //       .sort((a, b) => a[0] - b[0]);

    //     const table = anychart.data.table(0);
    //     table.addData(ohlcData);

    //     const plot = chart.plot(0);
    //     const mapping = table.mapAs({
    //       open: 1,
    //       high: 2,
    //       low: 3,
    //       close: 4,
    //     });

    //     const series = plot.candlestick(mapping);
    //     series.name(lastQuote?.[0]?.name || "Indicador");

    //     series.risingFill("#16a34a");
    //     series.risingStroke("#16a34a");
    //     series.fallingFill("#dc2626");
    //     series.fallingStroke("#dc2626");

    //     plot.yAxis().labels().enabled(true);
    //     plot.yAxis().labels().format("{%value}");
    //     plot.yGrid().enabled(true);
    //     plot.yGrid().stroke("#f1f1f1");

    //     const xAxis = plot.xAxis();
    //     xAxis.labels().enabled(true);
    //     xAxis.labels().format(function () {
    //       return anychart.format.dateTime(this.value, "MMM dd");
    //     });
    //     xAxis.ticks(true);

    //     const xScale = chart.xScale();
    //     xScale.minimumGap(0.02);
    //     xScale.maximumGap(0.02);

    //     chart.background().fill("#ffffff");
    //     chart.legend(false);
    //     chart.padding(10, 20, 20, 50);

    //     chart.crosshair(true);
    //     chart.scroller().enabled(false);

    //     chart.container(containerRef.current);
    //     chart.draw();
    //   }
    // }, [historicalSeries, chartType, lastQuote]);

    return (
        <div className="mt-3 ">
            <p className={`font-metropolis text-sm font-regular mb-2 text-secondary hover:underline cursor-pointer`} onClick={() => { navigate('/quotes') }}>
                Cotações
            </p>
            <p className={`font-metropolis mb-2 font-bold text-2xl `}>
                {lastQuote?.[0]?.name}
                <span className="text-gray-500 font-normal text-sm ml-1">({lastQuote?.[0]?.code})</span>
            </p>
            <div className="flex items-center gap-4 mb-2">
                <span className="tabular-nums text-[30px] font-bold">{lastQuote?.[0]?.value.toLocaleString("pt-BR")}</span>
                <span
                    className={[
                        "px-2 py-1 rounded-md text-sm font-semibold tabular-nums",
                        bgBadge(lastQuote?.[0] ? lastQuote?.[0]?.var : 0.0),
                    ].join(" ")}
                >
                    {fmtPct(lastQuote?.[0] ? lastQuote?.[0]?.var : 0.0)}
                </span>
            </div>

            <p className="font-metropolis text-md font-normal border-b border-[#003A60] mb-3">
                Atualizado em {lastQuote?.[0]?.date} {lastQuote?.[0]?.hour} • Fonte: {lastQuote?.[0]?.font ? lastQuote?.[0]?.font : "Datagro"}
            </p>

            {/* <div className="mb-1 flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex sm:ml-0 ml-1">
                    <button
                        onClick={() => setChartType("line")}
                        className={`px-1 py-1 text-xs rounded-sm border cursor-pointer hover:bg-gray-200 ${chartType === "line" ? "bg-gray-200" : "bg-white"
                            }
                        }`}
                    >
                        <svg width="25" height="25" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.67921 2.67921L2.67921 72.1434C2.67921 72.4393 2.91912 72.6792 3.21506 72.6792H72.6792" stroke="#303030" stroke-width="5.35843" stroke-linecap="round" />
                            <path d="M71.1508 4.94159L51.955 24.2002C51.0124 25.1459 49.5196 25.2509 48.4546 24.4464L34.8883 14.1974C33.7909 13.3683 32.246 13.5081 31.3141 14.5207L15.0048 32.2421" stroke="#98BF0E" stroke-width="5.35843" stroke-linecap="round" />
                            <path d="M33.6792 28.6792L33.6792 63.6792" stroke="#303030" stroke-width="5.35843" stroke-linecap="round" />
                            <path d="M68.6792 31.6792L68.6792 63.6792" stroke="#303030" stroke-width="5.35843" stroke-linecap="round" />
                            <path d="M50.6792 40.6792L50.6792 63.6792" stroke="#303030" stroke-width="5.35843" stroke-linecap="round" />
                            <path d="M15.6792 46.6792L15.6792 63.6792" stroke="#303030" stroke-width="5.35843" stroke-linecap="round" />
                        </svg>


                    </button>
                    <button
                        onClick={() => setChartType("candle")}
                        className={`px-1 py-1 text-xs  rounded-sm border cursor-pointer hover:bg-gray-200 ml-2 ${chartType === "candle" ? "bg-gray-200" : "bg-white"
                            }`}
                    >
                        <svg width="25" height="25" viewBox="0 0 70 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="7.64474" width="4.02299" height="75.3553" rx="2.01149" fill="#303030" />
                            <rect x="68.3908" y="77.5395" width="5.46053" height="68.3908" rx="2.73027" transform="rotate(90 68.3908 77.5395)" fill="#303030" />
                            <rect x="16.0919" y="30.5789" width="2.18421" height="4.02299" rx="1.09211" transform="rotate(-90 16.0919 30.5789)" fill="#98BF0E" />
                            <rect x="10.4598" y="30.5789" width="2.18421" height="7.24138" rx="1.09211" transform="rotate(-90 10.4598 30.5789)" fill="#98BF0E" />
                            <rect x="12.069" y="58.9737" width="1.6092" height="30.5789" rx="0.804599" transform="rotate(-180 12.069 58.9737)" fill="#98BF0E" />
                            <rect x="11.2644" y="58.9737" width="2.18421" height="8.04598" transform="rotate(-90 11.2644 58.9737)" fill="#98BF0E" />
                            <rect x="18.5057" y="28.3947" width="1.6092" height="30.5789" rx="0.804598" fill="#98BF0E" />
                            <rect x="14.4828" y="10.9211" width="1.6092" height="18.5658" rx="0.804598" fill="#98BF0E" />
                            <rect x="14.4828" y="57.8816" width="1.6092" height="17.4737" rx="0.804598" fill="#98BF0E" />
                            <rect x="49.0805" y="21.8421" width="2.18421" height="4.02299" rx="1.09211" transform="rotate(-90 49.0805 21.8421)" fill="#98BF0E" />
                            <rect x="43.4483" y="21.8421" width="2.18421" height="7.24138" rx="1.09211" transform="rotate(-90 43.4483 21.8421)" fill="#98BF0E" />
                            <rect x="45.0575" y="44.7763" width="1.6092" height="25.1184" rx="0.804598" transform="rotate(-180 45.0575 44.7763)" fill="#98BF0E" />
                            <rect x="44.2529" y="44.7763" width="2.18421" height="8.04598" transform="rotate(-90 44.2529 44.7763)" fill="#98BF0E" />
                            <rect x="51.4942" y="19.6579" width="1.6092" height="25.1184" rx="0.804598" fill="#98BF0E" />
                            <rect x="47.4713" y="5.46053" width="1.6092" height="15.2895" rx="0.804598" fill="#98BF0E" />
                            <rect x="47.4713" y="43.6842" width="1.6092" height="15.2895" rx="0.804598" fill="#98BF0E" />
                            <rect x="65.977" y="16.3816" width="2.18421" height="4.02299" rx="1.09211" transform="rotate(-90 65.977 16.3816)" fill="#E42121" />
                            <rect x="60.3448" y="16.3816" width="2.18421" height="7.24138" rx="1.09211" transform="rotate(-90 60.3448 16.3816)" fill="#E42121" />
                            <rect x="61.954" y="39.3158" width="1.6092" height="25.1184" rx="0.804598" transform="rotate(-180 61.954 39.3158)" fill="#E42121" />
                            <rect x="61.1494" y="39.3158" width="2.18421" height="8.04598" transform="rotate(-90 61.1494 39.3158)" fill="#E42121" />
                            <rect x="68.3908" y="14.1974" width="1.6092" height="25.1184" rx="0.804598" fill="#E42121" />
                            <rect x="64.3678" width="1.6092" height="15.2895" rx="0.804598" fill="#E42121" />
                            <rect x="64.3678" y="38.2237" width="1.6092" height="15.2895" rx="0.804598" fill="#E42121" />
                            <rect x="32.1839" y="22.9342" width="2.18421" height="4.02299" rx="1.09211" transform="rotate(-90 32.1839 22.9342)" fill="#E42121" />
                            <rect x="26.5517" y="22.9342" width="2.18421" height="7.24138" rx="1.09211" transform="rotate(-90 26.5517 22.9342)" fill="#E42121" />
                            <rect x="28.1609" y="51.3289" width="1.6092" height="30.5789" rx="0.804599" transform="rotate(-180 28.1609 51.3289)" fill="#E42121" />
                            <rect x="27.3563" y="51.3289" width="2.18421" height="8.04598" transform="rotate(-90 27.3563 51.3289)" fill="#E42121" />
                            <rect x="34.5977" y="20.75" width="1.6092" height="30.5789" rx="0.804598" fill="#E42121" />
                            <rect x="30.5747" y="3.27632" width="1.6092" height="18.5658" rx="0.804598" fill="#E42121" />
                            <rect x="30.5747" y="50.2368" width="1.6092" height="17.4737" rx="0.804598" fill="#E42121" />
                        </svg>

                    </button>
                </div>
                <div className="w-full flex sm:justify-end justify-start mt-3 sm:mt-0  text-black">
                    {times.map((t) => (
                        <div
                            key={t}
                            className={`flex items-center justify-center ml-1 px-2 py-1 text-xs rounded-sm border cursor-pointer hover:bg-gray-200
                            } ${t === interval ? 'bg-gray-200' : ''}`} onClick={() => { setInterval(t) }}
                        >
                            {t}
                        </div>
                    ))}
                </div>
            </div> */}

            {/* <div ref={containerRef} className="w-full h-[500px]" /> */}
            <StockDashboard />
            <div className="w-full flex justify-center p-4">
                {/* <div className="grid grid-cols-4 gap-4 w-full max-w-[900px]">
            <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 mb-1">ABERTURA</p>
            <p className="text-base  text-left font-semibold">21.26</p>
            </div>

            <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 mb-1">ENCERRAMENTO ANTERIOR</p>
            <p className="text-base text-left font-semibold">21.16</p>
            </div>

            <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 mb-1">1 ANO</p>
            <p className="text-base text-left font-semibold text-red-600">-0.75</p>
            </div>

            <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 mb-1">BAIXA 52 SEMANAS</p>
            <p className="text-base text-left font-semibold">20.89</p>
            </div>

            <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 mb-1">ALTA 52 SEMANAS</p>
            <p className="text-base  text-left font-semibold">23.52</p>
            </div>

            <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 mb-1">ACUMULADO DO ANO</p>
            <p className="text-base  text-left font-semibold text-red-600">-1.68</p>
            </div>


            <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 mb-1">VARIAÇÃO DO DIA</p>
            <p className="text-base text-left font-semibold">21.17 - 21.26</p>
            </div>

            <div className="border-b border-gray-300 pb-2">
            <p className="text-xs text-gray-500 mb-1">VARIAÇÃO DE 52 SEMANAS</p>
            <p className="text-base text-left font-semibold">20.89 - 23.52</p>
            </div>
        </div> */}
            </div>

        </div>
    );
};

