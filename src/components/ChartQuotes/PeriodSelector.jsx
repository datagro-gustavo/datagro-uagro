'use client'

import { periodInfo } from './data/stockData';

// const periods = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', 'Max'];
const periods = ["10D", "1M", "3M", "6M", "1Y", "5Y", "10Y"];

const PeriodSelector = ({ selectedPeriod, onPeriodChange }) => {
  
  return (
    <div className="flex items-center justify-center gap-0 border-t border-border bg-muted/30">
      {periods.map((period) => {
        const info = periodInfo[period];
        const isActive = selectedPeriod === period;
        // const isPositive = info.changePercent >= 0;

        return (
          <button
            key={period}
            onClick={() => onPeriodChange(period)}
            className={`
              flex flex-col items-center justify-center px-4 py-3 min-w-[100px]
              border-r border-border last:border-r-0
              transition-colors duration-150
              ${isActive ? 'bg-card' : 'hover:bg-card/50'}
            `}
          >
            <span
              className={`text-sm font-medium ${
                isActive ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              
              {period}
            </span>
            {/* <span
              className={`text-xs font-medium ${
                isPositive ? 'text-success' : 'text-destructive'
              }`}
            >
              {isPositive ? '+' : ''}
              {info.changePercent.toFixed(2)}%
            </span> */}
          </button>
        );
      })}
    </div>
  );
};

export default PeriodSelector;
