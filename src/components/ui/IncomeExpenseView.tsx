import type { Transaction } from "@/types/types";
import IncomeExpenseItem from "./IncomeExpenseItem";

interface TransactionViewProps {
    title: string,
    transactions: Transaction[]
}

const IncomeExpenseView = ({ title, transactions }: TransactionViewProps) => {
    return (
        <div className="flex flex-col min-h-[75vh] min-w-[62vw] bg-opacity-0 rounded-xl border border-[#ECEFF2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] m-6">
          <div className="flex flex-col rounded-t-xl border border-[#ECEFF2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] h-[90px] p-5 gap-2">
            <h1 className="text-base font-semibold font-sans">Last transactions</h1>
            <p className="text-xs text-gray-500">Check your last transactions</p>
          </div>
          <div className="bg-gray-100">
            <div className="grid grid-cols-5 mt-1 mb-1 ml-6">
                <p className="font-sans text-gray-500 text-sm">Title</p>
                <p className="font-sans text-gray-500 text-sm">Method</p>
                <p className="font-sans text-gray-500 text-sm">Date</p>
                <p className="font-sans text-gray-500 text-sm">Amount</p>
            </div>
          </div>
          {
                transactions.map( (transaction, index) => {
                    return (
                        <IncomeExpenseItem title={title} key={index} transaction={transaction}></IncomeExpenseItem>
                    )
                })
            }
        </div>
    )
};

export default IncomeExpenseView;