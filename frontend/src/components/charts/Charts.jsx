import { ExpensePieChart } from "./ExpensePieChart"
import { IncomeExpenseBarChart } from "./IncomeExpenseBarChart"
import { BalanceLineChart } from "./BalanceLineChart"
export function Charts({transactions}) {
  return (
    <div className="flex w-full h-[350px] justify-between">
     <ExpensePieChart transactions={transactions} />
      <IncomeExpenseBarChart transactions={transactions} />
      <BalanceLineChart transactions={transactions} />
    </div>
  )
}