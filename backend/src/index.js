import express from "express";
import cors from "cors";
import ConnectDB from "./config/db.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
  res.send("hello world");
})

const PORT = 3000 || process.env.PORT;
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