"use client"

import ImageCard from "@/components/ui/image-card"
import TextCard from "@/components/ui/text-card";
import TransactionView from "@/components/ui/TransactionView";
import ChartView from "@/components/ui/ChartView";
import { useState, useEffect } from "react";
import AddComponent from "@/components/ui/AddComponent";
import { Transaction } from "@/types/types";

const initTransactions: Transaction[] = [
  {
    title: "Rent",
    amount: "$750.00",
    date: "4/11/25",
    description: "I paid my monthly rent!",
    imageUrl: "https://www.realestatespreadsheets.com/wp-content/uploads/2024/04/rent-home-pros-cons.jpg",
    paymentMethod: "Visa 1234",
  },
  {
    title: "Groceries",
    amount: "$154.45",
    date: "4/10/25",
    description: "I bought weekly groceries.",
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/healthy-groceries-bag-66eaef810acf6.jpg?crop=0.7501082719792118xw:1xh;center,top&resize=1200:*",
    paymentMethod: "Visa 1234",
  },
  {
    title: "Movie",
    amount: "$20.12",
    date: "4/9/25",
    description: "I went to watch the Minecraft movie with friends.",
    imageUrl: "https://images.techeblog.com/wp-content/uploads/2025/03/01093040/a-minecraft-movie-final-trailer.jpg",
    paymentMethod: "Visa 1234",
  },
]

export default function OverviewPage() {

    const [transactions, setTransactions] = useState<Transaction[]>(initTransactions);
    const [isIncomeVisible, setIsIncomeVisible] = useState(false);
    const [isExpenseVisible, setIsExpenseVisible] = useState(false);

    useEffect(() => {
      if (isIncomeVisible || isExpenseVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [isIncomeVisible, isExpenseVisible])

    function addTransaction(transaction: Transaction) {
      setTransactions(transactions => [transaction, ...transactions]);
      if (isIncomeVisible) {
        setIsIncomeVisible(false);
      } else if (isExpenseVisible) {
        setIsExpenseVisible(false);
      }
    }

    function toggleIncomeComponent() {
      setIsIncomeVisible(!isIncomeVisible);
    }

    function toggleExpenseComponent() {
      setIsExpenseVisible(!isExpenseVisible);
    }


    return (
      <div>
        <div className="grid grid-cols-2">
          <h1 className="text-4xl p-3 pl-6 font-semibold">Hello, User!</h1>
        </div>
        <div className="grid grid-cols-3 gap-6 m-6">
            {/* Text Cards */}
            <div>
              <TextCard heading="Balance" number={5502.45} numColor="text-[#155EEF]" />
            </div>
            <div>
              <TextCard heading="Incomes" number={9450.01} numColor="text-black" />
            </div>
            <div>
              <TextCard heading="Expenses" number={3945.55} numColor="text-black" />
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
            <div>
            <ImageCard imageSrc="/DollarSign.png" imageAlt="Dollar icon" imageBackground="bg-cyan-200">
              <h2 className="text-lg font-semibold text-gray-900">Set Savings Goal</h2>
            </ImageCard>
            </div>
            <div className="flex flex-row gap-6">
              <ChartView />
              <TransactionView transactions={transactions}/>
            </div>
            { (isIncomeVisible || isExpenseVisible )&& <div className="bg-black opacity-75 w-screen h-screen top-0 left-0 fixed"></div>}
              { isIncomeVisible && <AddComponent title="Income" addFunction={addTransaction} closeFunction={toggleIncomeComponent}></AddComponent>}
              { isExpenseVisible && <AddComponent title="Expense" addFunction={addTransaction} closeFunction={toggleExpenseComponent}></AddComponent>}
        </div>
      </div>
    );
}