import { StatCard } from "./StatCard"
export function Summary(){
  return(
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
      <StatCard/>
    </div>
  )
}