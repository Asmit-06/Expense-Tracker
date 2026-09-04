import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

export function ExpensePieChart({ transactions = [] }) {
  // Linear signature palette
  const COLORS = [
    "#5e6ad2", // Linear lavender
    "#828fff", // Light lavender
    "#27a644", // Success green
    "#eb5757", // Muted red
    "#d0d6e0", // Ink muted
    "#8a8f98", // Ink subtle
    "#62666d", // Ink tertiary
    "#7a7fad", // Brand secure
  ];

  const expenseTransactions = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      const existingCategory = acc.find(
        (item) => item.category === transaction.category
      );
      if (existingCategory) {
        existingCategory.amount += Number(transaction.amount);
      } else {
        acc.push({
          category: transaction.category,
          amount: Number(transaction.amount),
        });
      }
    }
    return acc;
  }, []);

  const totalExpense = expenseTransactions.reduce((sum, item) => sum + item.amount, 0);

  const chartData = expenseTransactions.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
    percentage: totalExpense > 0 ? ((item.amount / totalExpense) * 100).toFixed(0) : 0,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#141516] border border-[#34343a] p-2.5 rounded-[6px] text-xs shadow-xl space-y-1">
          <p className="text-[#8a8f98] font-medium">{data.category}</p>
          <p className="text-[13px] font-semibold text-[#f7f8f8] font-mono">
            ₹{Number(data.amount).toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-[#62666d]">{data.percentage}% of total expenses</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#23252a] mb-2">
        <div>
          <h3 className="font-medium text-[14px] text-[#f7f8f8] tracking-[-0.2px]">
            Expense Distribution
          </h3>
          <p className="text-[12px] text-[#8a8f98]">
            Outflows categorized
          </p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-60 flex flex-col items-center justify-center text-[#8a8f98] text-[13px]">
          No expense transactions recorded
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={75}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f1011" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label inside donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.4px] text-[#8a8f98]">
                Total
              </span>
              <span className="text-[13px] font-semibold font-mono text-[#f7f8f8]">
                ₹{totalExpense.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Clean custom pill legend */}
          <div className="w-full grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-[#23252a] max-h-24 overflow-y-auto">
            {chartData.slice(0, 6).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs truncate">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-[#d0d6e0] text-[11px]">
                  {item.category}
                </span>
                <span className="text-[10px] text-[#8a8f98] font-mono ml-auto">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
