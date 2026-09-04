import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

export function BalanceLineChart({ transactions = [] }) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const data = transactions.reduce((acc, transaction) => {
    const d = new Date(transaction.date);
    if (isNaN(d)) return acc;
    const month = monthNames[d.getMonth()];
    const existingMonth = acc.find((item) => item.month === month);
    const amt = Number(transaction.amount);

    if (existingMonth) {
      if (transaction.type === "income") {
        existingMonth.income += amt;
      } else {
        existingMonth.expense += amt;
      }
    } else {
      acc.push({
        month,
        monthIndex: d.getMonth(),
        income: transaction.type === "income" ? amt : 0,
        expense: transaction.type === "expense" ? amt : 0,
      });
    }
    return acc;
  }, []);

  // Sort by month index
  data.sort((a, b) => a.monthIndex - b.monthIndex);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-lg border border-slate-700/50 text-xs space-y-1.5">
          <p className="font-bold text-slate-300 border-b border-slate-700 pb-1">{label}</p>
          {payload.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: item.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name === "income" ? "Income" : "Expense"}:
              </span>
              <span className="font-bold text-white">
                ₹{Number(item.value).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
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
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Monthly Trend
            </h3>
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              Cash flow trajectory
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-xs">
          <TrendingUp size={36} strokeWidth={1.5} className="mb-2 opacity-50" />
          No monthly transaction trends yet
        </div>
      ) : (
        <div className="w-full h-64 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                formatter={(val) => (val === "income" ? "Income" : "Expense")}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#10B981" }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#F43F5E"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#F43F5E" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
