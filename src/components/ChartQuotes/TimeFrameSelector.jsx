'use client'

import { BarChart3, LineChart, CandlestickChart } from 'lucide-react';
import { useContext } from 'react';

import { PricesContext } from '@/context/prices';

// const timeframes = ['1', '5', '15', '30', '1H', '5H', '1D', '1W', '1M'];
const timeframes = ["10D", "1M", "3M", "6M", "1Y", "5Y", "10Y"];

const TimeframeSelector = ({ selectedTimeframe, onTimeframeChange }) => {
      const { historicalSeries, lastQuote, setInterval, interval } = useContext(PricesContext);
  
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
      {/* Botões de tipo de gráfico (candle / line) */}
      <div className="flex items-center gap-1 mr-2">
        <button
          type="button"
          className="
            flex items-center justify-center
            h-7 w-7 rounded-md
            bg-transparent hover:bg-muted
            border border-transparent
            transition-colors
          "
        >
          <CandlestickChart className="w-4 h-4 text-muted-foreground" />
        </button>

        <button
          type="button"
          className="
            flex items-center justify-center
            h-7 w-7 rounded-md
            bg-transparent hover:bg-muted
            border border-transparent
            transition-colors
          "
        >
          <LineChart className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-5 w-px bg-border" />

      {/* Timeframes */}
      <div className="flex items-center gap-0.5">
        {timeframes.map((tf) => {
          const isActive = interval === tf;

          return (
            <button
              key={tf}
              type="button"
              onClick={() => {setInterval(tf)}}
              className={`
                px-2.5 py-1 text-[11px] font-medium rounded-sm
                border transition-colors
                ${
                  isActive
                    ? 'text-primary-foreground border-secondary'
                    : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted/70'
                }
              `}

      
            >
              {tf}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-5 w-px bg-border" />
    </div>
  );
};

export default TimeframeSelector;
