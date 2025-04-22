"use client"
import TextCard from "@/components/ui/text-card";
import ImageCard from "@/components/ui/image-card";
import { useState, useEffect } from "react";
import SavingsComponent from "@/components/ui/SavingsComponent";
import { useSession } from "next-auth/react";
import { Goal } from "@/types/types";

interface GoalsResponse {
    goal: Goal
}

export default function Home() {

    const session = useSession();
    const [isSavingsVisible, setIsSavingsVisible] = useState(false);
    const [savingsGoal, setSavingsGoal] = useState("0.00");

    useEffect(() => {
        getUserSavingsGoal();
    }, []);

    async function getUserSavingsGoal() {
        const url = `http://localhost:3000/api/goals/${session.data?.user?.id}`;
        const res = await fetch(url, {
            headers: { "Content-Type": "application/json"}
        });
        const goalRes = await res.json() as GoalsResponse;
        setSavingsGoal(parseInt(goalRes.goal.amount).toFixed(2));
    }
    
    function toggleSavingsComponent() {
        setIsSavingsVisible(!isSavingsVisible);
    }
    
    return (
        <div>
            <div className="grid grid-cols-2 gap-12 m-6">
                {/* Text Cards */}
                <div>
                    <TextCard heading="Savings Goal" number={savingsGoal} numColor="text-black" />
                </div>
                {/* Image Cards */}
                <div onClick={toggleSavingsComponent}>
                    <ImageCard imageSrc="/DollarSign.png" imageAlt="Dollar sign icon" imageBackground="bg-cyan-200">
                        <h2 className="text-lg font-semibold text-gray-900">Set Savings Goal</h2>
                    </ImageCard>
                </div>
                <div className="flex flex-row gap-6"> </div>
            </div>
            { isSavingsVisible && <div className="bg-black opacity-75 w-screen h-screen top-0 left-0 fixed"></div>}
            { isSavingsVisible && <SavingsComponent closeFunction={toggleSavingsComponent}></SavingsComponent>}
        </div>
    );
};