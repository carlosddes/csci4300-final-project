"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";

interface SavingsProps {
    closeFunction: () => void
}

const SavingsComponent = ({ closeFunction }: SavingsProps) => {

    const session = useSession();
    const [goal, setGoal] = useState("");

    function clearComponent() {
        const form = document.querySelector("form");
        form?.reset();
        closeFunction();
    }
    
    async function sendGoal() {
        const url = "http://localhost:3000/api/goals";
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({amount: goal, userID: session.data?.user?.id})
        });
        clearComponent();
    }
    

    return (
        <div className="flex fixed top-[30vh] left-[40vw] z-1000 justify-center border bg-white h-[200px] w-80 rounded-[10px]">
            <form onSubmit={e => {e.preventDefault(); sendGoal()}} className="relative w-4/5">
                <h1 className="font-semibold text-xl text-center mt-6 mb-4">Set Savings Goal</h1>
                <label className="text-sm font-semibold">Amount</label>
                <br></br>
                <input onChange={e => setGoal(e.target.value)} type="text" placeholder="Enter Amount" className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-[24px]"></br>
                <button type="button" className="bg-[#F04438] text-white rounded-sm min-h-[32px] min-w-[112px] mr-[30px]" onClick={closeFunction}>Cancel</button>
                <button type="submit" className="bg-[#155EEF] text-white rounded-sm min-h-[32px] min-w-[112px]">Set</button>
            </form>
        </div>
    );
};

export default SavingsComponent;