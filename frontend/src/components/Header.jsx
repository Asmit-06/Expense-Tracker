import { Plus } from "lucide-react";
export function Header({toggleModal,handleAddTransaction}) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
      <button className="bg-[#4B5CEE]  text-gray-100 px-6 py-4 rounded-[10px] cursor-pointer" onClick={handleAddTransaction}>
        <div className="flex gap-2">
          <Plus className="size-6" strokeWidth={2} />
          <p className="text-[17px]"  >Add Transaction</p>
        </div>
      </button>
    </div>
  );
}
