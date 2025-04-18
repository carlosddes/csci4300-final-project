"use client"
import { useState } from "react";
import { PaymentMethod, Transaction } from "@/types/types";

interface ExpenseProps {
    title: string,
    paymentMethods: PaymentMethod[]
    addFunction: (transaction: Transaction) => void
    closeFunction: () => void
}

const AddComponent = ({ title, paymentMethods, addFunction, closeFunction }: ExpenseProps) => {

    const [transaction, setTransaction] = useState<Transaction>({
        title: "",
        amount: "",
        date: "",
        description: "",
        imageUrl: "",
        paymentMethod: ""
    });

    function clearComponent() {
        const form = document.querySelector("form");
        form?.reset();
        closeFunction();
    }

    function addTransaction() {
        const newTransaction: Transaction = {
            title: transaction.title,
            amount: transaction.amount,
            date: transaction.date,
            description: transaction.description,
            imageUrl: transaction.imageUrl,
            paymentMethod: transaction.paymentMethod
        }
        addFunction(newTransaction);
    }

    return (
        <div className="flex fixed top-[5vh] left-[40vw] z-1000 justify-center border bg-white h-[640px] w-80 rounded-[10px]">
            <form onSubmit={e => { e.preventDefault(); addTransaction()}} className="relative w-4/5">
                <h1 className="font-semibold text-xl text-center mt-6 mb-4">Add {title}</h1>
                <label className="text-sm font-semibold">Title</label>
                <br></br>
                <input type="text" placeholder="Enter title" onChange={e => setTransaction({...transaction, title: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Amount</label>
                <br></br>
                <input type="text" placeholder="Enter amount" onChange={e => setTransaction({...transaction, amount: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Date</label>
                <br></br>
                <input type="date" placeholder="mm/dd/yyyy" onChange={e => setTransaction({...transaction, date: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Payment Method</label>
                <br></br>
                <select defaultValue={"Select an option"} onChange={e => setTransaction({...transaction, paymentMethod: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required>
                    <option disabled value="Select an option">Select an option</option>
                    { paymentMethods.map((option) => {
                        return <option key={option.lastFourDigits} value={option.cardNetwork + " " + option.lastFourDigits}>{option.cardNetwork + " " + option.lastFourDigits}</option>
                    })}
                </select>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Image URL</label>
                <br></br>
                <input type="text" placeholder="Enter image url" onChange={e => setTransaction({...transaction, imageUrl: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-6"></br>
                <label className="text-sm font-semibold">Description</label>
                <br></br>
                <textarea placeholder="Enter description" onChange={e => setTransaction({...transaction, description: e.target.value})} className="border border-[#A6BCDA] min-w-[256px] min-h-[85px] max-h-[85px] text-sm rounded-sm pt-2 pl-2 resize-none" required></textarea>
                <br className="mb-[24px]"></br>
                <button type="button" onClick={clearComponent} className="bg-[#F04438] text-white rounded-sm min-h-[32px] min-w-[112px] mr-[30px]">Cancel</button>
                <button type="submit" className="bg-[#155EEF] text-white rounded-sm min-h-[32px] min-w-[112px]">Add</button>
            </form>
        </div>
    );
};

export default AddComponent;