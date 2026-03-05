const basePrice = 48704.01;
const currentChange = 646.26;
const currentChangePercent = 1.34;

// Generate intraday data (1 Day)
function generateIntradayData() {
  const data = [];
  const now = new Date();
  const marketOpen = new Date(now);
  marketOpen.setHours(9, 30, 0, 0);

  const startPrice = basePrice - currentChange;
  const points = 80;

  for (let i = 0; i < points; i++) {
    const time = new Date(marketOpen.getTime() + i * 5 * 60000);
    const progress = i / points;

    // upward trend + ruido
    const trend = progress * currentChange;
    const noise = (Math.random() - 0.5) * 100;
    const price = startPrice + trend + noise;

    const volume = Math.floor(50000 + Math.random() * 100000);

    data.push({
      timestamp: time.getTime(),
      price: Math.round(price * 100) / 100,
      volume,
    });
  }

  return data;
}

// Generate weekly data
function generateWeeklyData() {
  const data = [];
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const startPrice = basePrice * 0.9822; // 1.78% lower
  const endPrice = basePrice;
  const points = 35;

  for (let i = 0; i < points; i++) {
    const time = new Date(
      weekAgo.getTime() + i * ((7 * 24 * 60 * 60 * 1000) / points)
    );
    const progress = i / points;

    const trend = progress * (endPrice - startPrice);
    const noise = (Math.random() - 0.5) * 200;
    const price = startPrice + trend + noise;

    const volume = Math.floor(80000 + Math.random() * 150000);

    data.push({
      timestamp: time.getTime(),
      price: Math.round(price * 100) / 100,
      volume,
    });
  }

  return data;
}

// Generate monthly data
function generateMonthlyData() {
  const data = [];
  const now = new Date();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const startPrice = basePrice * 0.9838; // 1.62% lower
  const endPrice = basePrice;
  const points = 30;

  for (let i = 0; i < points; i++) {
    const time = new Date(
      monthAgo.getTime() + i * ((30 * 24 * 60 * 60 * 1000) / points)
    );
    const progress = i / points;

    const trend = progress * (endPrice - startPrice);
    const noise = (Math.random() - 0.5) * 400;
    const price = startPrice + trend + noise;

    const volume = Math.floor(100000 + Math.random() * 200000);

    data.push({
      timestamp: time.getTime(),
      price: Math.round(price * 100) / 100,
      volume,
    });
  }

  return data;
}

// Generate 3 months data
function generate3MonthData() {
  const data = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const startPrice = basePrice * 0.9437; // 5.63% lower
  const endPrice = basePrice;
  const points = 60;

  for (let i = 0; i < points; i++) {
    const time = new Date(
      threeMonthsAgo.getTime() + i * ((90 * 24 * 60 * 60 * 1000) / points)
    );
    const progress = i / points;

    const trend = progress * (endPrice - startPrice);
    const noise = (Math.random() - 0.5) * 600;
    const price = startPrice + trend + noise;

    const volume = Math.floor(120000 + Math.random() * 250000);

    data.push({
      timestamp: time.getTime(),
      price: Math.round(price * 100) / 100,
      volume,
    });
  }

  return data;
}

// Generate 6 months data
function generate6MonthData() {
  const data = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

  const startPrice = basePrice * 0.8638; // 13.62% lower
  const endPrice = basePrice;
  const points = 90;

  for (let i = 0; i < points; i++) {
    const time = new Date(
      sixMonthsAgo.getTime() + i * ((180 * 24 * 60 * 60 * 1000) / points)
    );
    const progress = i / points;

    const trend = progress * (endPrice - startPrice);
    const noise = (Math.random() - 0.5) * 800;
    const price = startPrice + trend + noise;

    const volume = Math.floor(150000 + Math.random() * 300000);

    data.push({
      timestamp: time.getTime(),
      price: Math.round(price * 100) / 100,
      volume,
    });
  }

  return data;
}

// Generate 1 year data
function generate1YearData() {
  const data = [];
  const now = new Date();
  const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const startPrice = basePrice * 0.8968; // 10.32% lower
  const endPrice = basePrice;
  const points = 120;

  for (let i = 0; i < points; i++) {
    const time = new Date(
      yearAgo.getTime() + i * ((365 * 24 * 60 * 60 * 1000) / points)
    );
    const progress = i / points;

    const trend = progress * (endPrice - startPrice);
    const noise = (Math.random() - 0.5) * 1000;
    const price = startPrice + trend + noise;

    const volume = Math.floor(180000 + Math.random() * 350000);

    data.push({
      timestamp: time.getTime(),
      price: Math.round(price * 100) / 100,
      volume,
    });
  }

  return data;
}

// Generate 5 years data
function generate5YearData() {
  const data = [];
  const now = new Date();
  const fiveYearsAgo = new Date(
    now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000
  );

  const startPrice = basePrice * 0.379; // 62.10% lower
  const endPrice = basePrice;
  const points = 150;

  for (let i = 0; i < points; i++) {
    const time = new Date(
      fiveYearsAgo.getTime() + i * ((5 * 365 * 24 * 60 * 60 * 1000) / points)
    );
    const progress = i / points;

    const trend = progress * (endPrice - startPrice);
    const noise = (Math.random() - 0.5) * 2000;
    const price = startPrice + trend + noise;

    const volume = Math.floor(200000 + Math.random() * 400000);

    data.push({
      timestamp: time.getTime(),
      price: Math.round(price * 100) / 100,
      volume,
    });
  }

  return data;
}

// Generate max data (all time)
function generateMaxData() {
  const data = [];
  const now = new Date();
  const startDate = new Date('1980-01-01');

  const startPrice = 838.74; // Historical approximate
  const endPrice = basePrice;
  const points = 200;

  const totalTime = now.getTime() - startDate.getTime();

  for (let i = 0; i < points; i++) {
    const time = new Date(startDate.getTime() + i * (totalTime / points));
    const progress = i / points;

    const exponentialProgress = Math.pow(progress, 1.5);
    const trend = exponentialProgress * (endPrice - startPrice);
    const noise = (Math.random() - 0.5) * (startPrice + trend) * 0.1;
    const price = startPrice + trend + noise;

    const volume = Math.floor(100000 + Math.random() * 300000);

    data.push({
      timestamp: time.getTime(),
      price: Math.round(price * 100) / 100,
      volume,
    });
  }

  return data;
}

export const periodInfo = {
  '1D': {
    label: '1 Day',
    change: currentChange,
    changePercent: currentChangePercent,
  },
  '1W': { label: '1 Week', change: 853.42, changePercent: 1.78 },
  '1M': { label: '1 Month', change: 776.31, changePercent: 1.62 },
  '3M': { label: '3 Months', change: 2592.18, changePercent: 5.63 },
  '6M': { label: '6 Months', change: 5841.93, changePercent: 13.62 },
  '1Y': { label: '1 Year', change: 4543.67, changePercent: 10.32 },
  '5Y': { label: '5 Years', change: 30169.27, changePercent: 62.1 },
  Max: { label: 'Max', change: 47865.27, changePercent: 5705.63 },
};

export const stockDataGenerators = {
  '1D': generateIntradayData,
  '1W': generateWeeklyData,
  '1M': generateMonthlyData,
  '3M': generate3MonthData,
  '6M': generate6MonthData,
  '1Y': generate1YearData,
  '5Y': generate5YearData,
  Max: generateMaxData,
};

export const currentPrice = basePrice;
export const priceChange = currentChange;
export const priceChangePercent = currentChangePercent;
