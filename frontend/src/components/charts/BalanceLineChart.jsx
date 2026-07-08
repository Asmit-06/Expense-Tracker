import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function BalanceLineChart({ transactions }) {
  const data = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "short",
    });
    const existingMonth = acc.find((item) => item.month === month);
    if (existingMonth) {
      if (transaction.type === "income") {
        existingMonth.income += transaction.amount;
      } else {
        existingMonth.expense += transaction.amount;
      }
    } else {
      acc.push({
        month,
        income: transaction.type === "income" ? transaction.amount : 0,
        expense: transaction.type === "expense" ? transaction.amount : 0,
      });
    }
    return acc;
  }, []);

  if (data.length === 0) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <p className="dark:text-white">
          No Income Vs Expense <br /> data available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[350px] rounded-xl p-4 ">
      <h2 className="text-lg font-semibold dark:text-white mb-4">
        Monthly Trend
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#22C55E"
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
