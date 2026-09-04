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

  data.sort((a, b) => a.monthIndex - b.monthIndex);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#141516] border border-[#34343a] p-2.5 rounded-[6px] text-xs shadow-xl space-y-1">
          <p className="font-medium text-[#8a8f98] border-b border-[#23252a] pb-1">{label}</p>
          {payload.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: item.color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name === "income" ? "Income" : "Expense"}:
              </span>
              <span className="font-semibold font-mono text-[#f7f8f8]">
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
    <div className="rounded-[12px] bg-[#0f1011] border border-[#23252a] p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#23252a] mb-2">
        <div>
          <h3 className="font-medium text-[14px] text-[#f7f8f8] tracking-[-0.2px]">
            Monthly Trend
          </h3>
          <p className="text-[12px] text-[#8a8f98]">
            Cash flow trajectory
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-60 flex flex-col items-center justify-center text-[#8a8f98] text-[13px]">
          No monthly transaction trends recorded
        </div>
      ) : (
        <div className="w-full h-60 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#23252a" />
              <XAxis
                dataKey="month"
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
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
                formatter={(val) => (
                  <span className="text-[#8a8f98] text-[11px]">
                    {val === "income" ? "Income" : "Expense"}
                  </span>
                )}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#27a644"
                strokeWidth={2}
                dot={{ r: 2.5, fill: "#27a644" }}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#eb5757"
                strokeWidth={2}
                dot={{ r: 2.5, fill: "#eb5757" }}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
