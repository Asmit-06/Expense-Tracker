import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export function CashFlowChart({ transactions = [] }) {
  const [viewMode, setViewMode] = useState("bars"); // "bars" | "line"
  const [timeRange, setTimeRange] = useState("6M"); // "3M" | "6M" | "1Y" | "All"

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Aggregate by Year-Month to prevent multi-year collisions
  const aggregatedData = useMemo(() => {
    const map = new Map();

    transactions.forEach((tx) => {
      const d = new Date(tx.date);
      if (isNaN(d.getTime())) return;

      const year = d.getFullYear();
      const monthIndex = d.getMonth();
      const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

      if (!map.has(key)) {
        map.set(key, {
          key,
          year,
          monthIndex,
          monthLabel: `${monthNames[monthIndex]} '${String(year).slice(2)}`,
          income: 0,
          expense: 0,
        });
      }

      const item = map.get(key);
      const amount = Number(tx.amount) || 0;
      if (tx.type === "income") {
        item.income += amount;
      } else if (tx.type === "expense") {
        item.expense += amount;
      }
    });

    const list = Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));

    // Calculate net for each month
    return list.map((item) => ({
      ...item,
      net: item.income - item.expense,
    }));
  }, [transactions]);

  // Apply time range filter
  const filteredData = useMemo(() => {
    if (aggregatedData.length === 0) return [];
    if (timeRange === "3M") return aggregatedData.slice(-3);
    if (timeRange === "6M") return aggregatedData.slice(-6);
    if (timeRange === "1Y") return aggregatedData.slice(-12);
    return aggregatedData;
  }, [aggregatedData, timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const net = (item.income || 0) - (item.expense || 0);

      return (
        <div className="bg-[#141516] border border-[#34343a] p-3 rounded-[8px] text-xs shadow-2xl min-w-[180px] space-y-2">
          <div className="flex items-center justify-between border-b border-[#23252a] pb-2">
            <span className="font-medium text-[#f7f8f8]">{item.monthLabel || label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                net >= 0
                  ? "bg-[#27a644]/15 text-[#27a644] border border-[#27a644]/30"
                  : "bg-[#eb5757]/15 text-[#eb5757] border border-[#eb5757]/30"
              }`}
            >
              {net >= 0
                ? `+₹${net.toLocaleString("en-IN")}`
                : `-₹${Math.abs(net).toLocaleString("en-IN")}`}
            </span>
          </div>

          <div className="space-y-1.5 pt-0.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="flex items-center gap-1.5 text-[#8a8f98]">
                <span className="w-2 h-2 rounded-[2px] bg-[#27a644]" />
                Income
              </span>
              <span className="font-mono font-medium text-[#f7f8f8]">
                ₹{Number(item.income || 0).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <span className="flex items-center gap-1.5 text-[#8a8f98]">
                <span className="w-2 h-2 rounded-[2px] bg-[#eb5757]" />
                Expense
              </span>
              <span className="font-mono font-medium text-[#f7f8f8]">
                ₹{Number(item.expense || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-5 flex flex-col justify-between h-full">
      {/* Header with Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#23252a]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-[14px] text-[#f7f8f8] tracking-[-0.2px]">
              Cash Flow Trajectory
            </h3>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#141516] text-[#8a8f98] border border-[#23252a]">
              Monthly
            </span>
          </div>
          <p className="text-[12px] text-[#8a8f98] mt-0.5">
            Income vs expense comparison over time
          </p>
        </div>

        {/* Action Controls: View switcher & Time filters */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* View Mode: Bars vs Trend */}
          <div className="inline-flex items-center bg-[#141516] border border-[#23252a] rounded-[6px] p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("bars")}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-[4px] transition-all ${
                viewMode === "bars"
                  ? "bg-[#23252a] text-[#f7f8f8] shadow-sm"
                  : "text-[#8a8f98] hover:text-[#d0d6e0]"
              }`}
            >
              Bars
            </button>
            <button
              type="button"
              onClick={() => setViewMode("line")}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-[4px] transition-all ${
                viewMode === "line"
                  ? "bg-[#23252a] text-[#f7f8f8] shadow-sm"
                  : "text-[#8a8f98] hover:text-[#d0d6e0]"
              }`}
            >
              Trend
            </button>
          </div>

          {/* Time range pills */}
          <div className="inline-flex items-center bg-[#141516] border border-[#23252a] rounded-[6px] p-0.5">
            {["3M", "6M", "1Y", "All"].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-2 py-1 text-[11px] font-medium rounded-[4px] transition-all ${
                  timeRange === range
                    ? "bg-[#5e6ad2] text-white shadow-sm"
                    : "text-[#8a8f98] hover:text-[#d0d6e0]"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      {filteredData.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-[#8a8f98] text-[13px] border border-dashed border-[#23252a] rounded-[8px] my-4">
          <p>No transaction history recorded for this period</p>
          <span className="text-[11px] text-[#62666d] mt-1">
            Log an income or expense to see your cash flow timeline
          </span>
        </div>
      ) : (
        <div className="w-full h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === "bars" ? (
              <BarChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                barGap={6}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#23252a" />
                <XAxis
                  dataKey="monthLabel"
                  axisLine={{ stroke: "#23252a" }}
                  tickLine={false}
                  tick={{ fill: "#8a8f98", fontSize: 11 }}
                />
                <YAxis
                  axisLine={{ stroke: "#23252a" }}
                  tickLine={false}
                  tick={{ fill: "#8a8f98", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  tickFormatter={(val) =>
                    `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#27a644"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#eb5757"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            ) : (
              <LineChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#23252a" />
                <XAxis
                  dataKey="monthLabel"
                  axisLine={{ stroke: "#23252a" }}
                  tickLine={false}
                  tick={{ fill: "#8a8f98", fontSize: 11 }}
                />
                <YAxis
                  axisLine={{ stroke: "#23252a" }}
                  tickLine={false}
                  tick={{ fill: "#8a8f98", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  tickFormatter={(val) =>
                    `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#27a644"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#27a644" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  name="Expense"
                  stroke="#eb5757"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#eb5757" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {/* Chart Footer with Custom Legend */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#23252a] text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-[2px] bg-[#27a644]" />
            <span className="text-[#8a8f98] text-[11px]">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-[2px] bg-[#eb5757]" />
            <span className="text-[#8a8f98] text-[11px]">Expense</span>
          </div>
        </div>

        <span className="text-[11px] text-[#62666d] hidden sm:inline">
          {filteredData.length} {filteredData.length === 1 ? "month" : "months"} shown
        </span>
      </div>
    </div>
  );
}

