import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function ExpensePieChart({ transactions }) {
  const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#F97316",
    "#EF4444",
    "#A855F7",
    "#06B6D4",
  ];

  const expenseTransactions = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      const existingCategory = acc.find(
        (item) => item.category === transaction.category
      );
      if (existingCategory) {
        existingCategory.amount += transaction.amount;
      } else {
        acc.push({
          category: transaction.category,
          amount: transaction.amount,
        });
      }
    }
    return acc;
  }, []);

  const chartData = expenseTransactions.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  if (expenseTransactions.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center dark:text-white">
        No expense data available
      </div>
    );
  }
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <h1 className="dark:text-white">Expense Pie Chart</h1>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ category, value }) => `${category}:  ₹${value}`}
          />
          <Tooltip formatter={(value) => [`${value}`, "Amount"]} labelFormatter={(label) => `Category: ${label}`}/>
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              color: "#fff",
              paddingTop: "20px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
