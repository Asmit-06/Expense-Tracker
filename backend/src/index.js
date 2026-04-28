import express from "express";
import cors from "cors";
import ConnectDB from "./config/db.js"
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/transactions", transactionRoutes);



const PORT = process.env.PORT || 3000;
const start = async()=>{
  try{
    await ConnectDB();
    app.listen(PORT,()=>{
      console.log(`Server is running on port ${PORT}`);
    })

  }catch(err){
    console.error("Error starting server:", err);
    process.exit(1);
  }
}
start()