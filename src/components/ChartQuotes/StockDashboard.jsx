'use client'

import { useContext, useState } from 'react';


import {currentPrice, priceChange, priceChangePercent, periodInfo, } from './data/stockData';
import { ChartHeader } from './ChartHeader';
import TimeframeSelector from './TimeFrameSelector';
import StockChart from './StockChart';

import { PricesContext } from '@/context/prices';


const StockDashboard = () => {
	const [selectedTimeframe, setSelectedTimeframe] = useState('5');
	const [selectedPeriod, setSelectedPeriod] = useState('1D');
	const { historicalSeries, lastQuote, setInterval, interval } = useContext(PricesContext);

	const currentPeriodInfo = periodInfo[selectedPeriod];
	const displayChange = currentPeriodInfo.change;

	return (
		<div className="bg-background">
			<div className="max-w-6xl mx-auto">
				{/* Navigation */}
				{/* <NavigationTabs
						activeTab={activeTab}
						onTabChange={setActiveTab}
				/> */}

				{/* Chart Container */}
				<div className="bg-card border border-border rounded-b-lg shadow-sm overflow-hidden">
					{/* Timeframe Selector */}
					<TimeframeSelector
						selectedTimeframe={selectedTimeframe}
						onTimeframeChange={setSelectedTimeframe}
					/>

					{/* Chart Header */}
					<ChartHeader
						currentPrice={lastQuote?.[0]?.value}
						priceChange={displayChange}
						priceChangePercent={lastQuote?.[0]?.var}
						nameQuote={lastQuote?.[0]?.name}
					/>

					{/* Chart */}
					<div className="px-4 py-2">
						<StockChart period={selectedTimeframe} />
					</div>

					{/* Period Selector */}
					{/* <PeriodSelector
						selectedPeriod={selectedPeriod}
						onPeriodChange={setSelectedPeriod}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default StockDashboard;
