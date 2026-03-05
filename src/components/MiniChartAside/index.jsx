'use client'

import React, { useEffect, useRef } from 'react';

// mapa simples de tipo – se quiser, dá pra expandir depois
const CHART_TYPE_MAP = {
  area: 'area',
  line: 'line',
};

const CHART_CREATORS = {
  area: (anychartLib, data) => {
    const chart = anychartLib.area();
    chart.data(data);
    return chart;
  },
  line: (anychartLib, data) => {
    const chart = anychartLib.line();
    chart.data(data);
    return chart;
  },
};

export const MiniChartAside = ({
  chartConfig,
  fetchHistoricalSeriesForCards,
  wrapperClass = 'w-full h-32',
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!chartConfig?.cod) return;
    if (typeof window === 'undefined' || !window.anychart) return;

    const anychartLib = window.anychart;
    let chartInstance;
    let cancelled = false;

    const drawChart = async () => {
      if (!containerRef.current) return;

      const startDate = chartConfig?.ini
        ? new Date(chartConfig.ini).toISOString().split('T')[0]
        : null;

      const endDate = chartConfig?.end
        ? new Date(chartConfig.end).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      // busca série
      const serie = await fetchHistoricalSeriesForCards(
        chartConfig.cod,
        startDate,
        endDate
      );

      if (cancelled || !serie?.length) return;

      const data = serie.map((p) => ({
        x: p.y,        // eixo X (data)
        value: p.x,    // valor
      }));

      const values = data.map((d) => Number(d.value));
      if (!values.length) return;

      const min = Math.min(...values);
      const max = Math.max(...values);

      const rawShape = chartConfig?.shape;
      const chartType = CHART_TYPE_MAP[rawShape] || 'area';
      const creator = CHART_CREATORS[chartType] || CHART_CREATORS.area;

      const chart = creator(anychartLib, data);
      chartInstance = chart;

      chart.background().fill('#ffffff');
      chart.padding(6, 6, 2, 2);
      chart.legend(false);

      chart.yAxis().labels().enabled(false);
      chart.yAxis().ticks(false);
      chart.yAxis().stroke(null);

      chart.xAxis().labels().enabled(false);
      chart.xAxis().ticks(false);
      chart.xAxis().stroke(null);

      const series = chart.getSeries(0);
      if (series) {
        series.stroke('#16a34a', 2);
        if (chartType === 'area') {
          series.fill('#16a34a', 0.18);
        }
        series.hovered().markers(true).type('circle').size(4);
        series.tooltip().format(function () {
          return this.x + '\n' + this.value;
        });
      }

      chart.yScale().minimum(min);
      chart.yScale().maximum(max);

      const xScale = anychartLib.scales.dateTime();
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
  }, [chartConfig, fetchHistoricalSeriesForCards]);

  return <div className={wrapperClass} ref={containerRef} />;
};
