"use client"

import ImageCard from "@/components/ui/image-card"
import TextCard from "@/components/ui/text-card";
import TransactionView from "@/components/ui/TransactionView";
import ChartView from "@/components/ui/ChartView";
import { useState, useEffect } from "react";
import AddComponent from "@/components/ui/AddComponent";
import { Transaction } from "@/types/types";
import { useSession } from "next-auth/react";
import SavingsComponent from "@/components/ui/SavingsComponent";

interface TransactionsResponse {
  Incomes: Transaction[],
  Expenses: Transaction[]
}


export default function OverviewPage() {

    const session = useSession();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isIncomeVisible, setIsIncomeVisible] = useState(false);
    const [isExpenseVisible, setIsExpenseVisible] = useState(false);
    const [isSavingsVisible, setIsSavingsVisible] = useState(false);
    const [balance, setBalance] = useState("");
    const [expenses, setExpenses] = useState("");
    const [incomes, setIncomes] = useState("");

    useEffect(() => {
      getUserTransactions();
      console.log(session.data);
    }, [balance, expenses])

    async function getUserTransactions() {
      const url = `http://localhost:3000/api/transactions/${session.data?.user?.id}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const Utransactions = await res.json() as TransactionsResponse;
      const incomes = Utransactions.Incomes;
      const expenses = Utransactions.Expenses;
      calculateSums(incomes, expenses);
      setTransactions([...incomes, ...expenses].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    }

    async function calculateSums(incomes: Transaction[], expenses: Transaction[]) {
      let incomeSum = 0;
      let expenseSum = 0;

      incomes.forEach(income => incomeSum += parseFloat(income.amount));
      expenses.forEach(expense => expenseSum += parseFloat(expense.amount));
      setIncomes(incomeSum.toFixed(2));
      setExpenses(expenseSum.toFixed(2));
      setBalance((incomeSum - expenseSum).toFixed(2));
    }

    function toggleIncomeComponent() {
      setIsIncomeVisible(!isIncomeVisible);
    }

    function toggleExpenseComponent() {
      setIsExpenseVisible(!isExpenseVisible);
    }

    function toggleSavingsComponent() {
      setIsSavingsVisible(!isSavingsVisible);
    }

    return (
      <div>
        <div className="grid grid-cols-2">
          <h1 className="text-4xl p-3 pl-6 font-semibold">{`Hello, ${session.data?.user?.name}`}</h1>
        </div>
        <div className="grid grid-cols-3 gap-6 m-6">
            {/* Text Cards */}
            <div>
              <TextCard heading="Balance" number={balance} numColor="text-[#155EEF]" />
            </div>
            <div>
              <TextCard heading="Incomes" number={incomes} numColor="text-black" />
            </div>
            <div>
              <TextCard heading="Expenses" number={expenses} numColor="text-black" />
            </div>
            {/* Image Cards */}
            <div onClick={toggleIncomeComponent}>
              <ImageCard imageSrc="/Plus.png" imageAlt="Plus icon" imageBackground="bg-green-200">
                <h2 className="text-lg font-semibold text-gray-900">Add Income</h2>
              </ImageCard>
            </div>
            <div onClick={toggleExpenseComponent}>
              <ImageCard imageSrc="/Minus.png" imageAlt="Minus icon" imageBackground="bg-red-200">
                <h2 className="text-lg font-semibold text-gray-900">Add Expense</h2>
              </ImageCard>
            </div>
            <div onClick={toggleSavingsComponent}>
            <ImageCard imageSrc="/DollarSign.png" imageAlt="Dollar icon" imageBackground="bg-cyan-200">
              <h2 className="text-lg font-semibold text-gray-900">Set Savings Goal</h2>
            </ImageCard>
            </div>
            <div className="flex flex-row gap-6">
              <ChartView incomes={incomes} expenses={expenses}/>
              <TransactionView transactions={transactions}/>
            </div>
            { (isIncomeVisible || isExpenseVisible || isSavingsVisible )&& <div className="bg-black opacity-75 w-screen h-screen top-0 left-0 fixed"></div>}
              { isIncomeVisible && <AddComponent title="Income" addFunction={getUserTransactions} closeFunction={toggleIncomeComponent}></AddComponent>}
              { isExpenseVisible && <AddComponent title="Expense" addFunction={getUserTransactions} closeFunction={toggleExpenseComponent}></AddComponent>}
              { isSavingsVisible && <SavingsComponent closeFunction={toggleSavingsComponent}></SavingsComponent>}
        </div>
      </div>
    );
}