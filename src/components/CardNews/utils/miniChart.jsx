'use client'

import React, { useContext, useEffect, useRef } from "react";
import anychart from "anychart";

import { PricesContext } from "@/context/prices";


const CHART_TYPE_MAP = {
  0: "line",
  1: "area",
  2: "column",
  3: "spline",
  4: "splineArea",
  5: "candlestick",
};

const CHART_CREATORS = {
  line: anychart.line,
  area: anychart.area,
  column: anychart.column,
  spline: anychart.spline,
  splineArea: anychart.splineArea,
  stock: anychart.stock,
};

const CardMiniChart = ({ chartConfig, wrapperClass }) => {
  const containerRef = useRef(null);
  const { fetchHistoricalSeriesForCards } = useContext(PricesContext);

  useEffect(() => {
    if (!chartConfig?.cod) return;

    let chartInstance;
    let cancelled = false;

    const drawChart = async () => {
      if (!containerRef.current) return;

      const startDate = chartConfig?.ini
        ? new Date(chartConfig.ini).toISOString().split("T")[0]
        : null;

      const endDate = chartConfig?.end
        ? new Date(chartConfig.end).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const serie = await fetchHistoricalSeriesForCards(
        chartConfig.cod,
        startDate,
        endDate
      );

      if (cancelled || !serie?.length) return;

      const data = serie.map(p => ({
        x: p.y,
        value: p.x,
      }));

      const values = data.map(d => Number(d.value));
      if (!values.length) return;

      const min = Math.min(...values);
      const max = Math.max(...values);

      const rawShape = chartConfig?.shape;
      const chartType = CHART_TYPE_MAP[rawShape] || "area";
      const creator = CHART_CREATORS[chartType] || anychart.area;
      
      const chart = creator(data);
      chartInstance = chart;

      chart.background().fill("#fff");
      chart.padding(10, 10, 0, 0);
      chart.legend(false);

      chart.yAxis().labels().enabled(false);
      chart.yAxis().ticks(false);
      chart.yAxis().stroke(null);

      chart.xAxis().labels().enabled(false);
      chart.xAxis().ticks(false);
      chart.xAxis().stroke(null);

      const series = chart.getSeries(0);
      if (series) {
        series.stroke("#16a34a", 2);
        if (["area", "splineArea"].includes(chartType)) {
          series.fill("#16a34a", 0.18);
        }
        series.hovered().markers(true).type("circle").size(4);
        series.tooltip().format(function () {
          return `${this.x}\n${this.value}`;
        });
      }

      chart.yScale().minimum(min);
      chart.yScale().maximum(max);

      const xScale = anychart.scales.dateTime();
      xScale.minimumGap(0);
      xScale.maximumGap(0);
      chart.xScale(xScale);

      chart.container(containerRef.current);
      chart.draw();
    };

    drawChart();

    return () => {
      cancelled = true;
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, [
    chartConfig?.cod,
    chartConfig?.ini,
    chartConfig?.end,
    chartConfig?.shape,
    fetchHistoricalSeriesForCards,
  ]);

  return <div className={wrapperClass} ref={containerRef} />;
};

export default CardMiniChart;
