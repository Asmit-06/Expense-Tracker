import {
  IndianRupee,
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export function StatCard({
  income = 0,
  expense = 0,
  balance = 0,
  totalNoOfTransactions = 0,
  monthlyIncomePercentage = 0,
  monthlyExpensePercentage = 0,
  monthlyBalancePercentage = 0,
  transactionDiff = 0,
}) {
  const cards = [
    {
      title: "Total Balance",
      value: balance,
      isCurrency: true,
      percentage: monthlyBalancePercentage,
      icon: Wallet,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50",
      accentGlow: "from-indigo-500/10",
    },
    {
      title: "Total Income",
      value: income,
      isCurrency: true,
      percentage: monthlyIncomePercentage,
      icon: TrendingUp,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50",
      accentGlow: "from-emerald-500/10",
    },
    {
      title: "Total Expenses",
      value: expense,
      isCurrency: true,
      percentage: monthlyExpensePercentage,
      icon: TrendingDown,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/50",
      accentGlow: "from-rose-500/10",
    },
    {
      title: "Total Transactions",
      value: totalNoOfTransactions,
      isCurrency: false,
      diff: transactionDiff,
      icon: Receipt,
      iconColor: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900/50",
      accentGlow: "from-violet-500/10",
    },
  ];

  return (
    <>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isPositive =
          card.percentage !== undefined ? card.percentage >= 0 : card.diff >= 0;

        return (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all duration-200 group"
          >
            {/* Top row: Title and Icon Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {card.title}
              </span>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${card.iconBg}`}
              >
                <Icon size={19} className={card.iconColor} strokeWidth={2.2} />
              </div>
            </div>

            {/* Middle row: Big Metric Number */}
            <div className="mt-3.5 flex items-baseline gap-1">
              {card.isCurrency && (
                <IndianRupee
                  size={20}
                  className="text-slate-400 dark:text-slate-500 self-center"
                />
              )}
              <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {card.isCurrency
                  ? Number(card.value).toLocaleString("en-IN", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })
                  : card.value}
              </span>
            </div>

            {/* Bottom row: Trend Comparison */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span
                className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-md ${
                  isPositive
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                ) : (
                  <ArrowDownRight size={13} strokeWidth={2.5} />
                )}
                {card.percentage !== undefined
                  ? `${Math.abs(card.percentage).toFixed(1)}%`
                  : `${Math.abs(card.diff)}`}
              </span>
              <span className="text-slate-400 dark:text-slate-500 font-medium">
                vs last month
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
