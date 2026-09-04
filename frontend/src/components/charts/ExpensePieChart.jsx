import { useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

export function ExpensePieChart({ transactions = [] }) {
  // Linear signature palette
  const PALETTE = [
    "#5e6ad2", // Linear lavender brand
    "#828fff", // Light lavender
    "#27a644", // Success green
    "#eb5757", // Semantic red
    "#d0d6e0", // Ink muted
  ];
  const OTHER_COLOR = "#62666d"; // Ink tertiary for grouped "Other"

  const { chartData, totalExpense, otherCategoriesCount } = useMemo(() => {
    const categoryMap = new Map();

    transactions.forEach((tx) => {
      if (tx.type === "expense") {
        const cat = (tx.category || "Uncategorized").trim();
        const amt = Number(tx.amount) || 0;
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + amt);
      }
    });

    const sorted = Array.from(categoryMap.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    const total = sorted.reduce((sum, item) => sum + item.amount, 0);

    const MAX_SLICES = 5;
    let finalSlices = [];
    let otherCount = 0;

    if (sorted.length > MAX_SLICES) {
      const topItems = sorted.slice(0, MAX_SLICES - 1);
      const remainingItems = sorted.slice(MAX_SLICES - 1);
      const otherAmount = remainingItems.reduce((sum, item) => sum + item.amount, 0);
      otherCount = remainingItems.length;

      finalSlices = [
        ...topItems.map((item, idx) => ({
          ...item,
          color: PALETTE[idx % PALETTE.length],
          percentage: total > 0 ? ((item.amount / total) * 100).toFixed(1) : 0,
        })),
        {
          category: "Other",
          amount: otherAmount,
          color: OTHER_COLOR,
          percentage: total > 0 ? ((otherAmount / total) * 100).toFixed(1) : 0,
          isOther: true,
          otherCount,
        },
      ];
    } else {
      finalSlices = sorted.map((item, idx) => ({
        ...item,
        color: PALETTE[idx % PALETTE.length],
        percentage: total > 0 ? ((item.amount / total) * 100).toFixed(1) : 0,
      }));
    }

    return {
      chartData: finalSlices,
      totalExpense: total,
      otherCategoriesCount: otherCount,
    };
  }, [transactions]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#141516] border border-[#34343a] p-3 rounded-[8px] text-xs shadow-2xl space-y-1 min-w-[150px]">
          <div className="flex items-center gap-1.5 font-medium text-[#f7f8f8]">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: data.color }}
            />
            <span>{data.category}</span>
            {data.isOther && (
              <span className="text-[10px] text-[#8a8f98]">
                ({data.otherCount} items)
              </span>
            )}
          </div>
          <p className="text-[13px] font-semibold text-[#f7f8f8] font-mono">
            ₹{Number(data.amount).toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-[#8a8f98] font-mono">
            {data.percentage}% of total expenses
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#23252a]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-[14px] text-[#f7f8f8] tracking-[-0.2px]">
              Expense Distribution
            </h3>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#141516] text-[#8a8f98] border border-[#23252a]">
              Top Categories
            </span>
          </div>
          <p className="text-[12px] text-[#8a8f98] mt-0.5">
            Outflows categorized by volume
          </p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-[#8a8f98] text-[13px] border border-dashed border-[#23252a] rounded-[8px] my-4">
          <p>No expense transactions recorded</p>
          <span className="text-[11px] text-[#62666d] mt-1">
            Expenses will appear grouped here
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between flex-1 mt-2">
          {/* Donut Chart */}
          <div className="w-full h-48 relative my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={56}
                  outerRadius={80}
                  paddingAngle={chartData.length > 1 ? 2 : 0}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#0f1011"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Total figure */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-mono tracking-[0.6px] text-[#8a8f98]">
                Total Outflow
              </span>
              <span className="text-[14px] font-semibold font-mono text-[#f7f8f8] mt-0.5">
                ₹{totalExpense.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Clean Aligned Category Legend */}
          <div className="w-full space-y-1.5 pt-3 border-t border-[#23252a]">
            {chartData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-1 px-1.5 rounded hover:bg-[#141516] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-[#d0d6e0] text-[12px]">
                    {item.category}
                  </span>
                  {item.isOther && (
                    <span className="text-[10px] text-[#62666d] shrink-0 font-mono">
                      (+{item.otherCount})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[11px] font-mono text-[#8a8f98]">
                    {item.percentage}%
                  </span>
                  <span className="text-[11px] font-mono font-medium text-[#f7f8f8] min-w-[50px] text-right">
                    ₹{Number(item.amount).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#23252a] text-xs">
        <span className="text-[11px] text-[#62666d]">
          {chartData.length} {chartData.length === 1 ? "category" : "categories"}
          {otherCategoriesCount > 0 ? ` (${otherCategoriesCount} grouped in Other)` : ""}
        </span>
        <span className="text-[11px] font-mono text-[#8a8f98]">
          ₹{totalExpense.toLocaleString("en-IN")} total
        </span>
      </div>
    </div>
  );
}
