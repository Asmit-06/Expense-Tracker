import { IndianRupee, Wallet2, TrendingUp, TrendingDown ,FileText} from "lucide-react";
export function StatCard({income, expense, balance,totalNoOfTransactions,monthlyIncomePercentage,monthlyExpensePercentage,monthlyBalancePercentage,transactionDiff}) {
  return (
    <>
      <div className="stat-card  bg-white shadow-sm  rounded-lg p-6 flex  gap-4 items-center relative dark:bg-[#0D1016] ">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold text-gray-600">
            Total Balance
          </h3>
          <div className="flex items-center">
            <IndianRupee className="dark:text-white"/>
            <p className="text-[27px] font-bold dark:text-white">{balance}</p>
          </div>

          <p className="font-semibold text-gray-600 ">
            <span className={`font-semibold ${monthlyBalancePercentage >=0 ? "text-green-500":"text-red-500"}`}>
            {monthlyBalancePercentage >= 0 ? "+" : "-"}
            {Math.abs(monthlyBalancePercentage).toFixed(1)}%
             </span> from last month{" "}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded-4xl absolute right-8 top-8 dark:bg-[#7a95ca]">
          <Wallet2 color="blue"  />
        </div>
      </div>
      <div className="stat-card  bg-white shadow-sm  rounded-lg p-6 flex  gap-4 items-center relative dark:bg-[#0D1016]">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold text-gray-600">
            Total Income
          </h3>
          <div className="flex items-center">
            <IndianRupee className="dark:text-white"/>
            <p className="text-[27px] font-bold dark:text-white">{income}</p>
          </div>

          <p className="font-semibold text-gray-600 ">
            <span className={`font-semibold ${monthlyIncomePercentage >=0 ? "text-green-500":"text-red-500"}`}>
            {monthlyIncomePercentage >= 0 ? "+" : "-"}
            {Math.abs(monthlyIncomePercentage).toFixed(1)}%
             </span> from last month{" "}
          </p>
        </div>
        <div className="bg-green-400 p-4 rounded-4xl absolute right-8 top-8">
          <TrendingUp color="white" />
        </div>
      </div>
      <div className="stat-card  bg-white shadow-sm  rounded-lg p-6 flex  gap-4 items-center relative dark:bg-[#0D1016]">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold text-gray-600">
            Total Expenses
          </h3>
          <div className="flex items-center">
            <IndianRupee className="dark:text-white"/>
            <p className="text-[27px] font-bold dark:text-white"> {expense} </p>
          </div> 

         
          <p className="font-semibold text-gray-600 ">
            <span className={`font-semibold ${monthlyExpensePercentage >=0 ? "text-green-500":"text-red-500"}`}>
            {monthlyExpensePercentage >= 0 ? "+" : "-"}
            {Math.abs(monthlyExpensePercentage).toFixed(1)}%
             </span> from last month{" "}
          </p>
        </div>
        <div className="bg-red-400 p-4 rounded-4xl absolute right-8 top-8">
          <TrendingDown color="white" />
        </div>
      </div>
      <div className="stat-card  bg-white shadow-sm  rounded-lg p-6 flex  gap-4 items-center relative dark:bg-[#0D1016]">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold text-gray-600">
            Total Transaction
          </h3>
          <div className="flex items-center">
            
            <p className="text-[27px] font-bold dark:text-white">{totalNoOfTransactions}</p>
          </div>

         
          <p className="font-semibold text-gray-600 ">
            <span className={`font-semibold ${transactionDiff >=0 ? "text-green-500":"text-red-500"}`}>
            {transactionDiff >= 0 ? "+" : "-"}
            {Math.abs(transactionDiff)}
             </span> from last month{" "}
          </p>
        </div>
        <div className="bg-blue-500 p-4 rounded-4xl absolute right-8 top-8">
          <FileText color="white" />
        </div>
      </div>
    </>
  );
}
