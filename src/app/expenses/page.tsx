"use client"
import ImageCard from "@/components/ui/image-card";
import TextCard from "@/components/ui/text-card";
import AddComponent from "@/components/ui/AddComponent";
import { useState, useEffect } from "react"
import IncomeExpenseView from "@/components/ui/IncomeExpenseView";
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

export default function Home() {

    const [isExpenseVisible, setIsExpenseVisible] = useState(false);

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
                <TextCard heading="Expenses" number={9450.01} numColor="text-black" />
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
                <IncomeExpenseView transactions={initTransactions}/>
            </div>  
        </div>
      );
};