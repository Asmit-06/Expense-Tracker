import { StatCard } from "./StatCard"
export function Summary({income,expense,balance,totalNoOfTransactions}) {
  return(
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
      <StatCard income={income} expense={expense} balance={balance} totalNoOfTransactions={totalNoOfTransactions} />
    </div>
  )
}