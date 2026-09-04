import { CashFlowChart } from "./CashFlowChart";
import { ExpensePieChart } from "./ExpensePieChart";

export function Charts({ transactions = [] }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      {/* 2/3 width on desktop for ample time-series room */}
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
        <CashFlowChart transactions={transactions} />
      </div>

      {/* 1/3 width on desktop for category distribution */}
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
        <ExpensePieChart transactions={transactions} />
      </div>
    </section>
  );
}