import { Toaster } from "react-hot-toast"
import { DashBoard } from "./pages/DashBoard"
import { TransactionPage } from "./pages/TransactionPage"
import {Route,Routes} from "react-router-dom"

function App() {

 return (<>
  <Toaster/>
  <Routes>

    <Route path="/" element={<DashBoard/>}/>
    <Route path="/transactions" element={<TransactionPage/>}/>
  </Routes>
 
 </>
)

}

export default App
