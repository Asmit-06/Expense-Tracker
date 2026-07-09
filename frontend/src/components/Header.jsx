import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AvatarDropdown } from "./Avatar";
export function Header({ handleAddTransaction,user }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold dark:text-white">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">


        {!user? (<Link
          to="/login"
          className="border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-6 py-4 rounded-[10px] hover:bg-blue-600 hover:text-white transition"
        >
          Login
        </Link>):(<AvatarDropdown user={user}/>)}
       

        <button
          className="bg-[#4B5CEE] text-gray-100 px-6 py-4 rounded-[10px] cursor-pointer"
          onClick={handleAddTransaction}
        >
          <div className="flex gap-2 items-center">
            <Plus className="size-6" strokeWidth={2} />
            <p className="text-[17px]">Add Transaction</p>
          </div>
        </button>

      </div>
    </div>
  );
}