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
      color: "#27a644", // Linear semantic success
    },
    {
      name: "Expense",
      amount: chartData.expense,
      color: "#eb5757", // Linear muted red
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#141516] border border-[#34343a] p-2.5 rounded-[6px] text-xs shadow-xl space-y-1">
          <p className="text-[#8a8f98] font-medium">{data.name}</p>
          <p className="text-[13px] font-semibold text-[#f7f8f8] font-mono">
            ₹{Number(data.amount).toLocaleString("en-IN")}
          </p>
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
            Income vs Expense
          </h3>
          <p className="text-[12px] text-[#8a8f98]">
            Volume comparison
          </p>
        </div>
      </div>

      {chartData.income === 0 && chartData.expense === 0 ? (
        <div className="h-60 flex flex-col items-center justify-center text-[#8a8f98] text-[13px]">
          No financial data recorded
        </div>
      ) : (
        <div className="w-full h-60 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#23252a" />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: "#23252a" }}
                tickLine={false}
                tick={{ fill: "#8a8f98", fontSize: 11 }}
              />
              <YAxis
                axisLine={{ stroke: "#23252a" }}
                tickLine={false}
                tick={{ fill: "#8a8f98", fontSize: 10, fontFamily: "JetBrains Mono" }}
                tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={48}>
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
