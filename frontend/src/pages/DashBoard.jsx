import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export function DashBoard(){
  return (
    <div className="app-layout flex min-h-screen ">
      <Sidebar />
      <main className="flex-1 bg-gray-100 py-8 px-10">
        <Header/>
      </main>
     
    </div>
  );
}