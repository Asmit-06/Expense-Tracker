import { IndianRupeeIcon,Edit,Trash,ArrowRight } from "lucide-react";
export function TransactionRow() {
  return (
    <>
      <div className="header bg-white px-4 py-4">
        <h1 className="font-bold text-2xl">Recent Transactions</h1>
      </div>
      <div className="row flex justify-between font-semibold px-5 py-4 ">
        <p>Date</p>
        <p className="ml-16">Description</p>
        <p className="ml-8">Category</p>
        <p>Type</p>
        <p>Amount</p>
        <p>Actions</p>
      </div>
      <hr className="text-gray-200" />
      <div className="row flex justify-between font-semibold text-[15px] px-3 py-5 items-center bg-white">
        <p>May 18,2024</p>
        <p >Lunch at Restaurant</p>
        <p className="text-blue-500">Food & Dining</p>
        <p className="text-red-500">Expense</p>
        <div className="flex text-red-500 items-center">
          <p>-</p>
          <IndianRupeeIcon size={15}/>
          <p>450</p>
        </div>
        <div className="flex gap-6 items-center cursor-pointer">
          <Edit color="gray" />
          <Trash color="red" />
        </div>
      </div>
      <hr className="text-gray-200"/>
      <div className="row flex justify-between font-semibold text-[15px] px-3 py-5 items-center bg-white">
        <p>May 18,2024</p>
        <p >Lunch at Restaurant</p>
        <p className="text-blue-500">Food & Dining</p>
        <p className="text-red-500">Expense</p>
        <div className="flex text-red-500 items-center">
          <p>-</p>
          <IndianRupeeIcon size={15}/>
          <p>450</p>
        </div>
        <div className="flex gap-6 items-center cursor-pointer">
          <Edit color="gray" />
          <Trash color="red" />
        </div>
      </div>
      <hr className="text-gray-200"/>
      <div className="row flex justify-between font-semibold text-[15px] px-3 py-5 items-center bg-white">
        <p>May 18,2024</p>
        <p >Lunch at Restaurant</p>
        <p className="text-blue-500">Food & Dining</p>
        <p className="text-red-500">Expense</p>
        <div className="flex text-red-500 items-center">
          <p>-</p>
          <IndianRupeeIcon size={15}/>
          <p>450</p>
        </div>
        <div className="flex gap-6 items-center cursor-pointer">
          <Edit color="gray" />
          <Trash color="red" />
        </div>
      </div>
      <hr className="text-gray-200"/>
      <div className="row flex justify-between font-semibold text-[15px] px-3 py-5 items-center bg-white">
        <p>May 18,2024</p>
        <p >Lunch at Restaurant</p>
        <p className="text-blue-500">Food & Dining</p>
        <p className="text-red-500">Expense</p>
        <div className="flex text-red-500 items-center">
          <p>-</p>
          <IndianRupeeIcon size={15}/>
          <p>450</p>
        </div>
        <div className="flex gap-6 items-center cursor-pointer">
          <Edit color="gray" />
          <Trash color="red" />
        </div>
      </div>
      <hr className="text-gray-200"/>
      <div className="row flex justify-between font-semibold text-[15px] px-3 py-5 items-center bg-white">
        <p>May 18,2024</p>
        <p >Lunch at Restaurant</p>
        <p className="text-blue-500">Food & Dining</p>
        <p className="text-red-500">Expense</p>
        <div className="flex text-red-500 items-center">
          <p>-</p>
          <IndianRupeeIcon size={15}/>
          <p>450</p>
        </div>
        <div className="flex gap-6 items-center cursor-pointer">
          <Edit color="gray" />
          <Trash color="red" />
        </div>
      </div>
      <hr className="text-gray-200"/>
      <div className="row flex justify-between font-semibold text-[15px] px-3 py-5 items-center bg-white">
        <p>May 18,2024</p>
        <p >Lunch at Restaurant</p>
        <p className="text-blue-500">Food & Dining</p>
        <p className="text-red-500">Expense</p>
        <div className="flex text-red-500 items-center">
          <p>-</p>
          <IndianRupeeIcon size={15}/>
          <p>450</p>
        </div>
        <div className="flex gap-6 items-center cursor-pointer">
          <Edit color="gray" />
          <Trash color="red" />
        </div>
      </div>
      <hr className="text-gray-200"/>

      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 cursor-pointer">
        <p className="text-blue-600 font-semibold text-[18px] py-4 ">View All Transactions</p>
        <ArrowRight color="blue"/>
        </div>
        
      </div>
    </>
  );
}
