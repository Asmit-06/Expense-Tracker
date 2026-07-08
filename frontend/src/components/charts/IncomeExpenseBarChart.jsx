import {
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
} from "recharts";

export function IncomeExpenseBarChart({ transactions }) {
  const chartData = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const data = [
    {
      name: "Income Vs Expense",
      income: chartData.income,
      expense: chartData.expense,
    },
  ];

  if (chartData.income === 0 && chartData.expense === 0) {
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
        Income Vs Expense
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="40%">
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="income"
            fill="#22C55E"
            radius={[8, 8, 0, 0]}
            label={{ position: "top" }}
          />
          <Bar
            dataKey="expense"
            fill="#EF4444"
            radius={[8, 8, 0, 0]}
            label={{ position: "top" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
