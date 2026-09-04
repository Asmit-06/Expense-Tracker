import express from "express";
import cors from "cors";
import ConnectDB from "./config/db.js"
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoutes.js";
import authRoutes from "./routes/authRoutes.js"
dotenv.config();

const app = express();

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  const clean = origin.trim().replace(/\/$/, "").toLowerCase();

  // 1. Allow all localhost development ports
  if (/^http:\/\/localhost(:\d+)?$/.test(clean)) return true;

  // 2. Allow all Vercel domains (*.vercel.app)
  if (/^https:\/\/[a-z0-9-_.]+\.vercel\.app$/.test(clean)) return true;

  // 3. Allow origins configured in CLIENT_URL (comma-separated, quotes stripped)
  if (process.env.CLIENT_URL) {
    const list = process.env.CLIENT_URL
      .split(",")
      .map((u) => u.trim().replace(/^["']|["']$/g, "").replace(/\/$/, "").toLowerCase())
      .filter(Boolean);
    if (list.includes(clean) || list.includes("*")) return true;
  }

  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      console.warn(`[CORS] Request blocked from origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Health check endpoints for deployment verification and uptime monitors
app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API is running", status: "ok" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);


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