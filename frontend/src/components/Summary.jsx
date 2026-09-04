import { StatCard } from "./StatCard";

export function Summary({
  income,
  expense,
  balance,
  totalNoOfTransactions,
  monthlyIncomePercentage,
  monthlyExpensePercentage,
  monthlyBalancePercentage,
  transactionDiff,
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard
        income={income}
        expense={expense}
        balance={balance}
        totalNoOfTransactions={totalNoOfTransactions}
        monthlyIncomePercentage={monthlyIncomePercentage}
        monthlyExpensePercentage={monthlyExpensePercentage}
        monthlyBalancePercentage={monthlyBalancePercentage}
        transactionDiff={transactionDiff}
      />
    </section>
  );
}