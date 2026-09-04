import {
  ResponsiveContainer,
  Bar,
  BarChart,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { BarChart3 } from "lucide-react";

export function IncomeExpenseBarChart({ transactions = [] }) {
  const chartData = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += Number(transaction.amount);
      } else {
        acc.expense += Number(transaction.amount);
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const data = [
    {
      name: "Income",
      amount: chartData.income,
      color: "#10B981", // Emerald
    },
    {
      name: "Expense",
      amount: chartData.expense,
      color: "#F43F5E", // Rose
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-lg border border-slate-700/50 text-xs space-y-1">
          <p className="font-semibold text-slate-300">{data.name}</p>
          <p className="text-sm font-bold text-white">
            ₹{Number(data.amount).toLocaleString("en-IN")}
          </p>
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
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <BarChart3 size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Income vs Expense
            </h3>
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              Total volume comparison
            </p>
          </div>
        </div>
      </div>

      {chartData.income === 0 && chartData.expense === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-xs">
          <BarChart3 size={36} strokeWidth={1.5} className="mb-2 opacity-50" />
          No financial data recorded yet
        </div>
      ) : (
        <div className="w-full h-64 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]} maxBarSize={56}>
                {data.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
