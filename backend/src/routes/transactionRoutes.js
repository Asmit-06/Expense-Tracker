import { Router } from "express";
import { getAllTransactions,addTransaction,getTransactionById,deleteTransaction,updateTransaction } from "../controllers/TransactionController.js";

const router= Router();
router.get("/", getAllTransactions);
router.post("/", addTransaction);
router.get("/:id", getTransactionById);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);

export default router;