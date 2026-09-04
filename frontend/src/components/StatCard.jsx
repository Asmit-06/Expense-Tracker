import {
  IndianRupee,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  TrendingUp,
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
      accentColor: "text-[#5e6ad2]",
    },
    {
      title: "Total Income",
      value: income,
      isCurrency: true,
      percentage: monthlyIncomePercentage,
      icon: ArrowUpRight,
      accentColor: "text-[#27a644]",
    },
    {
      title: "Total Expenses",
      value: expense,
      isCurrency: true,
      percentage: monthlyExpensePercentage,
      icon: ArrowDownLeft,
      accentColor: "text-[#eb5757]",
    },
    {
      title: "Transactions Count",
      value: totalNoOfTransactions,
      isCurrency: false,
      diff: transactionDiff,
      icon: Receipt,
      accentColor: "text-[#8a8f98]",
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
            className="rounded-[12px] bg-[#0f1011] border border-[#23252a] hover:border-[#34343a] p-5 sm:p-6 transition-colors duration-150 flex flex-col justify-between"
          >
            {/* Top row: Eyebrow label and micro icon */}
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium uppercase tracking-[0.4px] text-[#8a8f98]">
                {card.title}
              </span>
              <div className="w-7 h-7 rounded-[6px] bg-[#141516] border border-[#23252a] flex items-center justify-center">
                <Icon size={14} className={card.accentColor} strokeWidth={2.2} />
              </div>
            </div>

            {/* Middle row: Big Metric Number in JetBrains Mono */}
            <div className="my-4 flex items-baseline gap-1">
              {card.isCurrency && (
                <IndianRupee
                  size={19}
                  className="text-[#8a8f98] self-center shrink-0"
                />
              )}
              <span className="text-[26px] sm:text-[28px] font-semibold text-[#f7f8f8] font-mono tracking-[-1.0px]">
                {card.isCurrency
                  ? Number(card.value).toLocaleString("en-IN", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })
                  : card.value}
              </span>
            </div>

            {/* Bottom row: Trend Comparison Pill */}
            <div className="flex items-center gap-2 text-[12px]">
              <span
                className={`inline-flex items-center gap-1 font-mono font-medium px-2 py-0.5 rounded-full text-[11px] border border-[#23252a] bg-[#141516] ${
                  isPositive ? "text-[#27a644]" : "text-[#eb5757]"
                }`}
              >
                {isPositive ? "+" : "-"}
                {card.percentage !== undefined
                  ? `${Math.abs(card.percentage).toFixed(1)}%`
                  : `${Math.abs(card.diff)}`}
              </span>
              <span className="text-[#62666d] text-[11px] tracking-[-0.05px]">
                from last month
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
