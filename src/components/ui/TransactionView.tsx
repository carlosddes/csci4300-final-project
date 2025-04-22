"use client"
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import TransactionCard from "./TransactionCard";
import { Transaction } from "@/types/types";
import EmptyCard from "./EmptyCard";

  interface TransactionViewProps {
    transactions: Transaction[]
  }

const TransactionView = ( { transactions }: TransactionViewProps) => {

  const [currentTransaction, setCurrentTransaction] = useState(0);

  function prevTransaction() {
    setCurrentTransaction(index => index === 0 ? transactions.length - 1 : index - 1);
  }

  function nextTransaction() {
    setCurrentTransaction(index => index === transactions.length - 1 ? 0 : index + 1);
  }

  return (
      <div className="flex flex-col min-h-[75vh] min-w-[63vw] bg-opacity-0 rounded-xl border border-[#ECEFF2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
        <div className="flex flex-col rounded-t-xl border border-[#ECEFF2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] h-[90px] p-5 gap-2">
          <h1 className="text-base font-semibold font-sans">Last transactions</h1>
          <p className="text-xs text-gray-500">Check your last transactions</p>
        </div>
        <div className="flex flex-row gap-6 items-center justify-center">
          <FaArrowAltCircleLeft className="w-12 h-12 text-black" onClick={prevTransaction}/>
          <div className="flex mt-10 justify-center">
            { 
              transactions.length === 0 && <EmptyCard></EmptyCard>
            }
            { transactions.length > 0 && transactions.map( (transaction, index) => {
                    return (
                        index === currentTransaction && (
                            <TransactionCard key={index} transaction={transactions[index]}></TransactionCard>
                        )
                    )
                })
            }
          </div>
          <FaArrowAltCircleRight className="w-12 h-12 text-black" onClick={nextTransaction}/>
        </div>
      </div>
  )
};

export default TransactionView;