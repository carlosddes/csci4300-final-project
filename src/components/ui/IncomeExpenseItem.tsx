import { Transaction } from "@/types/types";
import { useEffect, useState } from "react";
import EditComponent from "./EditComponent";
import ViewTransactionComponent from "./ViewTransactionComponent";

interface IncomeExpenseItemProps {
    transaction: Transaction;
};

const IncomeExpenseItem = ( {transaction}: IncomeExpenseItemProps) => {

    const[isEditVisible, setIsEditVisible] = useState(false);
    const[isViewVisible, setIsViewVisible] = useState(false);

    useEffect(() => {
        if (isEditVisible || isViewVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isEditVisible, isViewVisible])

    function toggleEditComponent() {
        setIsEditVisible(!isEditVisible);
    }

    function toggleViewComponent() {
        setIsViewVisible(!isViewVisible);
    }

    return (
        <div>
            <div className="border-b border-gray-200">
                <div className="grid grid-cols-5 mt-2 mb-2 ml-6">
                    <p className="font-sans text-black font-semibold">{transaction.title}</p>
                    <p className="font-sans text-gray-500 font-med">{transaction.paymentMethod}</p>
                    <p className="font-sans text-gray-500 font-med">{transaction.date}</p>
                    <p className="font-sans text-black font-semibold">{transaction.amount}</p>
                    <div className="flex flex-row gap-8">
                        <button className="bg-blue-200 rounded-md w-12" onClick={toggleViewComponent}>View</button>
                        <button className="bg-green-200 rounded-md w-12" onClick={toggleEditComponent}>Edit</button>
                        <button className="bg-red-200 rounded-md w-14">Delete</button>
                    </div>
                </div>
            </div>
            <div>
                { (isEditVisible || isViewVisible) && <div className="bg-black opacity-75 w-screen h-screen top-0 left-0 fixed"></div> }
                { isEditVisible && <EditComponent editedTransaction={transaction} closeFunction={toggleEditComponent}/> }
                { isViewVisible && <ViewTransactionComponent transaction={transaction} closeFunction={toggleViewComponent}/>}
            </div>
        </div>
    );
};

export default IncomeExpenseItem;