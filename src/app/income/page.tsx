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
    const [isIncomeVisible, setIsIncomeVisible] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [incomeTotal, setIncomeTotal] = useState("0.00");

    useEffect(() => {
      getUserTransactions();
    }, [])

    async function getUserTransactions() {
      const url = `http://localhost:3000/api/transactions/${session.data?.user?.id}`;
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json"}
      });
      const trans = await res.json() as TransactionsResponse;
      const incomes = trans.Incomes;
      await calculateIncomeTotal(incomes);
      setTransactions(incomes.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
    
    async function calculateIncomeTotal(incomes: Transaction[]) {
      let sum = 0;
      incomes.forEach(income => sum += parseFloat(income.amount));
      setIncomeTotal(sum.toFixed(2));
    }

    function toggleIncomeComponent() {
        setIsIncomeVisible(!isIncomeVisible);
    }

    return (
        <div>
          <div className="grid grid-cols-2 gap-12 m-6">
              {/* Text Cards */}
              <div>
                <TextCard heading="Incomes" number={incomeTotal} numColor="text-black" />
              </div>
              {/* Image Cards */}
              <div onClick={toggleIncomeComponent}>
                <ImageCard imageSrc="/Plus.png" imageAlt="Plus icon" imageBackground="bg-green-200">
                    <h2 className="text-lg font-semibold text-gray-900">Add Income</h2>
                </ImageCard>
              </div>
              <div className="flex flex-row gap-6">
              </div>
              { isIncomeVisible && <div className="bg-black opacity-75 w-screen h-screen top-0 left-0 fixed"></div>}
                { isIncomeVisible && <AddComponent title="Income" addFunction={getUserTransactions} closeFunction={toggleIncomeComponent}></AddComponent>}
          </div>
            <div>
                <IncomeExpenseView title="Income" transactions={transactions}/>
            </div>  
        </div>
      );
};