'use client'

import { useContext, useEffect, useRef, useState } from 'react';

import { PricesContext } from '@/context/prices';


// AnyChart virá do script carregado
const StockChart = ({ period }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { historicalSeries } = useContext(PricesContext);

  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega script do AnyChart
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.anychart) {
      const script = document.createElement('script');
      script.src =
        'https://cdn.anychart.com/releases/8.11.1/js/anychart-bundle.min.js';
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else if (window.anychart) {
      setIsLoaded(true);
    }
  }, []);

  // Desenha o gráfico
  useEffect(() => {
    if (!chartRef.current || !isLoaded || !historicalSeries?.length) return;

    const anychartLib = window.anychart;
    if (!anychartLib) return;

    // limpa instância anterior
    if (chartInstance.current) {
      chartInstance.current.dispose();
      chartInstance.current = null;
    }

    const chart = anychartLib.stock();
    chartInstance.current = chart;

    // monta dados no formato que o AnyChart espera
    const dataTable = anychartLib.data.table('x');

    const mappedData = historicalSeries.map((p) => ({
      x: new Date(p.y).getTime(),              // eixo X = data
      value: Number(p.x) || 0,                 // preço
      volume: Math.abs(Number(p.var ?? 0)) || 0, // volume fake
    }));

    dataTable.addData(mappedData);

    const priceMapping = dataTable.mapAs({ value: 'value' });
    const volumeMapping = dataTable.mapAs({ value: 'volume' });

    // === PRICE PLOT ===
    const pricePlot = chart.plot(0);
    pricePlot.height('75%');
    pricePlot.yAxis(0).orientation('right');
    pricePlot.yAxis(0).labels().format('${%Value}{decimalsCount:2}');
    pricePlot.yAxis(0).labels().fontColor('#6b7280');
    pricePlot.yAxis(0).labels().fontSize(11);
    pricePlot.yAxis(0).stroke('#e5e7eb');

    pricePlot.yGrid(true);
    pricePlot.yGrid().stroke({ color: '#e5e7eb', dash: '3 3' });
    pricePlot.xGrid(false);

    const areaSeries = pricePlot.area(priceMapping);
    areaSeries.name('Price');
    areaSeries.fill({
      angle: 90,
      keys: [
        // { offset: 0, color: 'rgba(59, 130, 246, 0.4)' },
        { offset: 1, color: 'rgba(140, 176, 36, 0.05)' },
      ],
    });
    areaSeries.stroke({ color: '#8CB024', thickness: 2 });

    // === VOLUME PLOT ===
    const volumePlot = chart.plot(1);
    volumePlot.height('20%');
    volumePlot.yAxis(0).orientation('right');
    volumePlot.yAxis(0).labels().fontColor('#6b7280');
    volumePlot.yAxis(0).labels().fontSize(10);
    volumePlot.yAxis(0).stroke('#6b7280');

    volumePlot.yGrid(true);
    volumePlot.yGrid().stroke({ color: '#8CB024', dash: '3 3' });
    volumePlot.xGrid(false);

    const volumeSeries = volumePlot.column(volumeMapping);
    volumeSeries.name('Volume');
    volumeSeries.fill('rgba(140, 176, 36, 0.6)');
    volumeSeries.stroke('none');

    // Geral
    chart.scroller().enabled(false);
    chart.background().fill('#ffffff');
    chart.padding([10, 60, 10, 10]);

    chart.crosshair().displayMode('float');
    chart.crosshair().xLabel().enabled(true);
    chart.crosshair().yLabel().enabled(true);
    chart.crosshair().xStroke('#3b82f6');
    chart.crosshair().yStroke('#3b82f6');

    chart.tooltip().titleFormat('{%x}{dateTimeFormat:MMM dd, yyyy}');

    chart.container(chartRef.current);
    chart.draw();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [historicalSeries, isLoaded]);

  return (
    <div ref={chartRef} className="w-full h-[400px] bg-card rounded-lg">
      {!isLoaded && (
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-muted-foreground">
            Loading chart...
          </div>
        </div>
      )}
    </div>
  );
};

export default StockChart;
