'use client'

import { TrendingUp, Bot } from 'lucide-react';

export const ChartHeader = ({ currentPrice, priceChange, priceChangePercent, nameQuote }) => {
  const isPositive = priceChange >= 0;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            {nameQuote}
          </h2>

          <span
            className={`flex items-center gap-1 text-lg font-semibold ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}
          >
            {isPositive && <TrendingUp className="w-4 h-4" />}
            {currentPrice}
          </span>

          <span
            className={`text-sm font-medium ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}
          >
            (
            {isPositive ? '+' : ''}
            {priceChangePercent}%)
          </span>
        </div>

      </div>

    </div>
  );
};
