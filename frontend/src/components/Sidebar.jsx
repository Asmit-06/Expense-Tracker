import {
  Wallet,
  Home,
  Plus,
  Folder,
  Settings,
  ChartNoAxesColumn,
  IndianRupee,
} from "lucide-react";

import { useState } from "react";
export function Sidebar({toggleModal}) {
  const [active, setActive] = useState(0);
  const handleActive = (index) => {
  
      setActive(index);
    
  };
  return (
    <div className="sidebar w-full lg:w-64 flex flex-col ">
      <div className="sidebar-header bg-[#4858E4] px-8 py-8 ">
        <div className="flex text-white gap-4 text-[20px]  items-center">
          <Wallet className=" size-8 " strokeWidth={2} />
          <h2>ExpenseTracker</h2>
        </div>
      </div>

      <div className="main-contents flex flex-col px-8 py-10 gap-12 cursor-pointer mb-40 font-semibold text-gray-500">
        <div
          className={
            active ===0
              ? `flex items-center content-center gap-4 text-blue-500`
              : `flex items-center content-center gap-4`
          }
          onClick={()=>handleActive(0)}
        >
          <Home className=" size-6 " strokeWidth={2} />
          <h2 className="text-[16px]">DashBoard</h2>
        </div>
        <div
          className={
            active ===1
              ? `flex items-center content-center gap-4 text-blue-500`
              : `flex items-center content-center gap-4`
          }
          onClick={()=>handleActive(1)}
        >
          <Wallet className=" size-6 " strokeWidth={2} />
          <h2 className="text-[16px]">Transactions</h2>
        </div>
        <div className={
            active ===2
              ? `flex items-center content-center gap-4 text-blue-500`
              : `flex items-center content-center gap-4`
          }
          onClick={()=>handleActive(2)}>
          <Plus className=" size-6 " strokeWidth={2} />
          <h2 className="text-[16px]" onClick={toggleModal}>Add Transaction</h2>
        </div>
        <div className={
            active ===3
              ? `flex items-center content-center gap-4 text-blue-500`
              : `flex items-center content-center gap-4`
          }
          onClick={()=>handleActive(3)}>
          <Folder className=" size-6 " strokeWidth={2} />
          <h2 className="text-[16px]">Categories</h2>
        </div>
        <div className={
            active ===4
              ? `flex items-center content-center gap-4 text-blue-500`
              : `flex items-center content-center gap-4`
          }
          onClick={()=>handleActive(4)}>
          <ChartNoAxesColumn className=" size-6 " strokeWidth={2} />
          <h2 className="text-[16px]">Report</h2>
        </div>
        <div className={
            active ===5
              ? `flex items-center content-center gap-4 text-blue-500`
              : `flex items-center content-center gap-4`
          }
          onClick={()=>handleActive(5)}>
          <Settings className=" size-6 " strokeWidth={2} />
          <h2 className="text-[16px]">Settings</h2>
        </div>
      </div>

      <div className="balance flex flex-col gap-2 px-6 py-6 border border-gray-200 rounded-[10px] mx-4">
        <div className="flex gap-4 items-center">
          <Wallet
            className=" size-8 bg-blue-100 px-2 py-2 rounded-[3px]"
            strokeWidth={2}
            color="blue"
          />
          <p>Balance</p>
        </div>
        <div className="flex items-center">
          <IndianRupee className="size-7" />
          <h1 className="text-3xl font-bold">24,500.00</h1>
        </div>
        <p>Total Balance</p>
      </div>
    </div>
  );
}
