// range: '10D' | '1M' | '3M' | '6M' | '1Y' | '5Y' | '10Y'
export const getFromDate = (range) => {
    const now = new Date();
    const from = new Date(now);

    const ranges = [
        { key: "10D", label: "10D", type: "D", count: 10 },
        { key: "1M", label: "1M", type: "M", count: 1 },
        { key: "3M", label: "3M", type: "M", count: 3 },
        { key: "6M", label: "6M", type: "M", count: 6 },
        { key: "1Y", label: "1Y", type: "Y", count: 1 },
        { key: "5Y", label: "5Y", type: "Y", count: 5 },
        { key: "10Y", label: "10Y", type: "Y", count: 10 }
    ];

    const r = ranges.find(item => item.key === range);


    if (r.type === "D") from.setDate(from.getDate() - r.count);
    if (r.type === "M") from.setMonth(from.getMonth() - r.count);
    if (r.type === "Y") from.setFullYear(from.getFullYear() - r.count);


    const formatDate = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    return { i: formatDate(from), f: formatDate(now) };
};
