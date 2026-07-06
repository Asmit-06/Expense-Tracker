import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { TransactionTable } from "../components/TransactionTable";
import { AddTransactionModal } from "../components/AddTransactionModal";
import {Charts} from "../components/charts/Charts"
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export function DashBoard() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setisOpen(true);
  };

  // all transactions
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/transactions`)

      setTransactions(res.data.data);
    } catch (err) {
      console.log("Error fetching transactions", err);
    }
  };

  const [isOpen, setisOpen] = useState(false);

  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  const closeModal = () => {
    setisOpen(false);
    setSelectedTransaction(null);
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setisOpen(true);
  };

  const deleteTransaction = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this transaction?"
      )
    )
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/transactions/${id}`
      );

      fetchTransactions();

      toast.success("Transaction deleted successfully");
    } catch (err) {
      console.log("Error deleting transaction", err);
    }
  };

  // ---------- TOTAL INCOME ----------
  const totalIncome = () => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === "income") {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);
  };

  // ---------- TOTAL EXPENSE ----------
  const totalExpense = () => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);
  };

  // ---------- TOTAL TRANSACTIONS ----------
  const totalTransactions = () => {
    return transactions.length;
  };

  // ---------- CURRENT MONTH INCOME ----------
  const currentMonthIncome = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);

      if (
        transaction.type === "income" &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      ) {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);
  };

  // ---------- PREVIOUS MONTH INCOME ----------
  const previousMonthIncome = () => {
    let previousMonth = new Date().getMonth() - 1;
    let lastYear = new Date().getFullYear();

    if (previousMonth < 0) {
      previousMonth = 11;
      lastYear = lastYear - 1;
    }

    return transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);

      if (
        transaction.type === "income" &&
        transactionDate.getMonth() === previousMonth &&
        transactionDate.getFullYear() === lastYear
      ) {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);
  };

  // ---------- INCOME PERCENTAGE ----------
  const currentMonthPercentage = () => {
    const currentIncome = currentMonthIncome();
    const previousIncome = previousMonthIncome();

    if (previousIncome === 0) {
      return currentIncome === 0 ? 0 : 100;
    }

    return Number(
      (
        ((currentIncome - previousIncome) / previousIncome) *
        100
      ).toFixed(2)
    );
  };

  // ---------- CURRENT MONTH EXPENSE ----------
  const currentMonthExpense = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);

      if (
        transaction.type === "expense" &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      ) {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);
  };

  // ---------- PREVIOUS MONTH EXPENSE ----------
  const previousMonthExpense = () => {
    let previousMonth = new Date().getMonth() - 1;
    let lastYear = new Date().getFullYear();

    if (previousMonth < 0) {
      previousMonth = 11;
      lastYear = lastYear - 1;
    }

    return transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);

      if (
        transaction.type === "expense" &&
        transactionDate.getMonth() === previousMonth &&
        transactionDate.getFullYear() === lastYear
      ) {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);
  };

  // ---------- EXPENSE PERCENTAGE ----------
  const currentMonthExpensePercentage = () => {
    const currentExpense = currentMonthExpense();
    const previousExpense = previousMonthExpense();

    if (previousExpense === 0) {
      return currentExpense === 0 ? 0 : 100;
    }

    return Number(
      (
        ((currentExpense - previousExpense) / previousExpense) *
        100
      ).toFixed(2)
    );
  };

  // ---------- BALANCE ----------
  const currentMonthBalance =
    currentMonthIncome() - currentMonthExpense();

  const previousMonthBalance =
    previousMonthIncome() - previousMonthExpense();

  // ---------- BALANCE PERCENTAGE ----------
  const currentMonthBalancePercentage = () => {
    if (previousMonthBalance === 0) {
      return currentMonthBalance === 0 ? 0 : 100;
    }

    return Number(
      (
        ((currentMonthBalance - previousMonthBalance) /
          Math.abs(previousMonthBalance)) *
        100
      ).toFixed(2)
    );
  };

  // ---------- TOTAL TRANSACTIONS ----------
  const currentMonthTransactions = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return transactions.filter((transaction)=>{
      const transactionDate = new Date(transaction.date);

      return(
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      )
    }).length
  }
  const previousMonthTransactions = () => {
    let previousMonth = new Date().getMonth() - 1;
    let lastYear = new Date().getFullYear();

    if (previousMonth < 0) {
      previousMonth = 11;
      lastYear = lastYear - 1;
    }

    return transactions.filter((transaction)=>{
      const transactionDate = new Date(transaction.date);

      return(
        transactionDate.getMonth() === previousMonth &&
        transactionDate.getFullYear() === lastYear
      )
    }).length
  }
  // ---------- TRANSACTIONS AMOUNT -------- //
  const currentMonthTotalTransactions = currentMonthTransactions();
  const previousMonthTotalTransactions = previousMonthTransactions();

  // ---------- FINAL VALUES ----------
  const income = totalIncome();

  const expense = totalExpense();

  const totalNoOfTransactions = totalTransactions();

  const monthlyIncomePercentage =
    currentMonthPercentage();

  const monthlyExpensePercentage =
    currentMonthExpensePercentage();

  const monthlyBalancePercentage =
    currentMonthBalancePercentage();

  const recentTransactions = transactions.slice(0,5);
  
  const transactionDiff = currentMonthTotalTransactions - previousMonthTotalTransactions;
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="app-layout flex min-h-screen ">
      <Sidebar
        handleAddTransaction={handleAddTransaction}
        balance={income - expense}
      />

      <main className="flex-1 bg-gray-100 py-8 px-10 dark:bg-[#06070c] ">
        <Header
          handleAddTransaction={handleAddTransaction}
        />

        <Summary
          income={income}
          expense={expense}
          balance={income - expense}
          totalNoOfTransactions={totalNoOfTransactions}
          monthlyIncomePercentage={
            monthlyIncomePercentage
          }
          monthlyExpensePercentage={
            monthlyExpensePercentage
          }
          monthlyBalancePercentage={
            monthlyBalancePercentage
          }
            transactionDiff={transactionDiff}
        />

        <Charts transactions={transactions} />
        

        <TransactionTable
          transactions={recentTransactions}
          fetchTransactions={fetchTransactions}
          deleteTransaction={deleteTransaction}
          handleEdit={handleEdit}
          showViewAll={true}
        />

        {isOpen && (
          <AddTransactionModal
            closeModal={closeModal}
            fetchTransactions={fetchTransactions}
            selectedTransaction={selectedTransaction}
          />
        )}
      </main>
    </div>
  );
}