import { Transaction } from "@/types/types";

interface IncomeExpenseItemProps {
    transaction: Transaction;
};

const IncomeExpenseItem = ( {transaction}: IncomeExpenseItemProps) => {
    return (
        <div className="border-b border-gray-200">
            <div className="grid grid-cols-5 mt-2 mb-2 ml-6">
                <p className="font-sans text-black font-semibold">{transaction.title}</p>
                <p className="font-sans text-gray-500 font-med">{transaction.paymentMethod}</p>
                <p className="font-sans text-gray-500 font-med">{transaction.date}</p>
                <p className="font-sans text-black font-semibold">{transaction.amount}</p>
                <div className="flex flex-row gap-8">
                    <button className="bg-blue-200 rounded-md w-12">View</button>
                    <button className="bg-green-200 rounded-md w-12">Edit</button>
                    <button className="bg-red-200 rounded-md w-12">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default IncomeExpenseItem;