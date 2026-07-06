import { ExpensePieChart } from "./ExpensePieChart"
export function Charts({transactions}) {
  return (
    <div className="flex  justify-between">
     <ExpensePieChart transactions={transactions} />
   
    </div>
  )
}