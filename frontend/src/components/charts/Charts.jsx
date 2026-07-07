import { ExpensePieChart } from "./ExpensePieChart"
import { IncomeExpenseBarChart } from "./IncomeExpenseBarChart"
export function Charts({transactions}) {
  return (
    <div className="flex w-full h-[350px] justify-between">
     <ExpensePieChart transactions={transactions} />
      <IncomeExpenseBarChart transactions={transactions} />
    </div>
  )
}