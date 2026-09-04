import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

export function ExpensePieChart({ transactions = [] }) {
  const COLORS = [
    "#6366F1", // Indigo
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#F43F5E", // Rose
    "#8B5CF6", // Violet
    "#0EA5E9", // Sky
    "#EC4899", // Pink
    "#14B8A6", // Teal
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
        <div className="bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-lg border border-slate-700/50 text-xs space-y-1">
          <p className="font-semibold text-slate-300">{data.category}</p>
          <p className="text-sm font-bold text-white">
            ₹{Number(data.amount).toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-400">{data.percentage}% of total expenses</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <PieIcon size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Expense Breakdown
            </h3>
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              By categories
            </p>
          </div>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-xs">
          <PieIcon size={36} strokeWidth={1.5} className="mb-2 opacity-50" />
          No expense transactions recorded yet
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label inside donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                Total
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                ₹{totalExpense.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Clean custom pill legend */}
          <div className="w-full grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 max-h-24 overflow-y-auto">
            {chartData.slice(0, 6).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-slate-600 dark:text-slate-300 font-medium text-[11px]">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold ml-auto">
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
