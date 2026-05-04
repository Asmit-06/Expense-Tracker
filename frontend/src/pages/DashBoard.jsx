import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { TransactionTable } from "../components/TransactionTable";
export function DashBoard(){
  return (
    <div className="app-layout flex min-h-screen ">
      <Sidebar />
      <main className="flex-1 bg-gray-100 py-8 px-10">
        <Header/>
        <Summary/>
        <TransactionTable/>
      </main>
     
    </div>
  );
}