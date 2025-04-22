"use client"
import ImageCard from "@/components/ui/image-card";
import TextCard from "@/components/ui/text-card";
import AddComponent from "@/components/ui/AddComponent";
import { useState, useEffect } from "react"
import IncomeExpenseView from "@/components/ui/IncomeExpenseView";
import { Transaction } from "@/types/types";
import { useSession } from "next-auth/react";

interface TransactionsResponse {
  Incomes: Transaction[],
  Expenses: Transaction[]
}

export default function Home() {

    const session = useSession();
    const [isExpenseVisible, setIsExpenseVisible] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [expenseTotal, setExpenseTotal] = useState("0.00");

    useEffect(() => {
      getUserTransactions();
    }, [])

    async function getUserTransactions() {
      const url = `http://localhost:3000/api/transactions/${session.data?.user?.id}`;
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json"}
      });
      const trans = await res.json() as TransactionsResponse;
      const expenses = trans.Expenses;
      await calculateExpenseTotal(expenses);
      setTransactions(expenses.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }

    async function calculateExpenseTotal(expenses: Transaction[]) {
      let sum = 0;
      expenses.forEach(expense => sum += parseFloat(expense.amount));
      setExpenseTotal(sum.toFixed(2));
    }

    function toggleExpenseComponent() {
        setIsExpenseVisible(!isExpenseVisible);
    }

    function handleAddExpense() {
        setIsExpenseVisible(false);
    }

    return (
        <div>
          <div className="grid grid-cols-2 gap-12 m-6">
              {/* Text Cards */}
              <div>
                <TextCard heading="Expenses" number={expenseTotal} numColor="text-black" />
              </div>
              {/* Image Cards */}
              <div onClick={toggleExpenseComponent}>
                <ImageCard imageSrc="/Minus.png" imageAlt="Minus icon" imageBackground="bg-red-200">
                    <h2 className="text-lg font-semibold text-gray-900">Add Expense</h2>
                </ImageCard>
              </div>
              <div className="flex flex-row gap-6">
              </div>
              { isExpenseVisible && <div className="bg-black opacity-75 w-screen h-screen top-0 left-0 fixed"></div>}
                { isExpenseVisible && <AddComponent title="Expense" addFunction={handleAddExpense} closeFunction={toggleExpenseComponent}></AddComponent>}
          </div>
            <div>
                <IncomeExpenseView title={"Expense"} transactions={transactions}/>
            </div>  
        </div>
      );
};