"use client"
import { useState } from "react";
import { Transaction } from "@/types/types";

interface ExpenseProps {
    editedTransaction: Transaction,
    closeFunction: () => void
}

const EditComponent = ({ editedTransaction, closeFunction }: ExpenseProps) => {

    const [transaction, setTransaction] = useState<Transaction>({
        title: editedTransaction.title,
        amount: editedTransaction.amount,
        date: editedTransaction.date,
        description: editedTransaction.description,
        imageURL: editedTransaction.imageURL,
        paymentMethod: editedTransaction.paymentMethod,
        userID: editedTransaction.userID
    });

    function clearComponent() {
        const form = document.querySelector("form");
        form?.reset();
        closeFunction();
    }

    return (
        <div className="flex fixed top-[5vh] left-[40vw] z-1000 justify-center border bg-white h-[640px] w-80 rounded-[10px]">
            <form onSubmit={e => { e.preventDefault() }} className="relative w-4/5">
                <h1 className="font-semibold text-xl text-center mt-6 mb-4">Edit Transaction</h1>
                <label className="text-sm font-semibold">Title</label>
                <br></br>
                <input type="text" placeholder="Enter title" value={transaction.title} onChange={e => setTransaction({...transaction, title: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Amount</label>
                <br></br>
                <input type="text" placeholder="Enter amount" value={transaction.amount} onChange={e => setTransaction({...transaction, amount: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Date</label>
                <br></br>
                <input type="date" placeholder="mm/dd/yyyy" value={transaction.date} onChange={e => setTransaction({...transaction, date: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Payment Method</label>
                <br></br>
                <input type="text" placeholder="Enter payment method" value={transaction.paymentMethod} onChange={e => setTransaction({...transaction, paymentMethod: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Image URL</label>
                <br></br>
                <input type="text" placeholder="Enter image url" value={transaction.imageURL} onChange={e => setTransaction({...transaction, imageURL: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Description</label>
                <br></br>
                <textarea placeholder="Enter description" value={transaction.description} onChange={e => setTransaction({...transaction, description: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[85px] max-h-[85px] text-sm rounded-sm pt-2 pl-2 resize-none" required></textarea>
                <br className="mb-[24px]"></br>
                <button type="button" onClick={clearComponent} className="bg-[#F04438] text-white rounded-sm min-h-[32px] min-w-[112px] mr-[30px]">Cancel</button>
                <button type="submit" className="bg-[#155EEF] text-white rounded-sm min-h-[32px] min-w-[112px]">Edit</button>
            </form>
        </div>
    );
};

export default EditComponent;