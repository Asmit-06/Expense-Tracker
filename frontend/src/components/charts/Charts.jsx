import { ExpensePieChart } from "./ExpensePieChart";
import { IncomeExpenseBarChart } from "./IncomeExpenseBarChart";
import { BalanceLineChart } from "./BalanceLineChart";

export function Charts({ transactions = [] }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <ExpensePieChart transactions={transactions} />
      <IncomeExpenseBarChart transactions={transactions} />
      <BalanceLineChart transactions={transactions} />
    </section>
  );
}