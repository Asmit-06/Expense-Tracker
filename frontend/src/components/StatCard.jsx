import { IndianRupee, Wallet2, TrendingUp, TrendingDown ,FileText} from "lucide-react";
export function StatCard() {
  return (
    <>
      <div className="stat-card  bg-white shadow-sm  rounded-lg p-6 flex  gap-4 items-center relative">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold text-gray-600">
            Total Balance
          </h3>
          <div className="flex items-center">
            <IndianRupee />
            <p className="text-[27px] font-bold ">50000.00</p>
          </div>

          <p className="font-semibold text-gray-600">
            <span className="text-green-500 font-semibold">+ 12.5% </span> from
            last month{" "}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded-4xl absolute right-8 top-8">
          <Wallet2 color="blue" />
        </div>
      </div>
      <div className="stat-card  bg-white shadow-sm  rounded-lg p-6 flex  gap-4 items-center relative">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold text-gray-600">
            Total Income
          </h3>
          <div className="flex items-center">
            <IndianRupee />
            <p className="text-[27px] font-bold ">45000.00</p>
          </div>

          <p className="font-semibold text-gray-600">
            <span className="text-green-500 font-semibold">+ 8.5% </span> from
            last month{" "}
          </p>
        </div>
        <div className="bg-green-400 p-4 rounded-4xl absolute right-8 top-8">
          <TrendingUp color="white" />
        </div>
      </div>
      <div className="stat-card  bg-white shadow-sm  rounded-lg p-6 flex  gap-4 items-center relative">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold text-gray-600">
            Total Expenses
          </h3>
          <div className="flex items-center">
            <IndianRupee />
            <p className="text-[27px] font-bold ">4000.00</p>
          </div>

          <p className="font-semibold text-gray-600">
            <span className="text-red-500 font-semibold">- 12.5% </span> from
            last month{" "}
          </p>
        </div>
        <div className="bg-red-400 p-4 rounded-4xl absolute right-8 top-8">
          <TrendingDown color="white" />
        </div>
      </div>
      <div className="stat-card  bg-white shadow-sm  rounded-lg p-6 flex  gap-4 items-center relative">
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold text-gray-600">
            Total Transaction
          </h3>
          <div className="flex items-center">
            
            <p className="text-[27px] font-bold ">28</p>
          </div>

          <p className="font-semibold text-gray-600">
            <span className="text-blue-600 font-semibold">+ 4 </span> from
            last month{" "}
          </p>
        </div>
        <div className="bg-blue-500 p-4 rounded-4xl absolute right-8 top-8">
          <FileText color="white" />
        </div>
      </div>
    </>
  );
}
