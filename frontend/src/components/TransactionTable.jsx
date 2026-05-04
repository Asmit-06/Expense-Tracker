import { TransactionRow } from "./TransactionRow"
export function TransactionTable(){
  return(
    <div className="mt-8 shadow-sm border border-gray-200 rounded-[7px] overflow-hidden ">
      <TransactionRow/>
    </div>
  )
}