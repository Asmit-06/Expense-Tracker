import { ExpensePieChart } from "./ExpensePieChart"
import { IncomeExpenseBarChart } from "./IncomeExpenseBarChart"
import { BalanceLineChart } from "./BalanceLineChart"
export function Charts({transactions}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 ">
     <ExpensePieChart transactions={transactions} />
      <IncomeExpenseBarChart transactions={transactions} />
      <BalanceLineChart transactions={transactions} />
    </div>
  )
}