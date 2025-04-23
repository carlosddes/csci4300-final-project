"use client"
import TextCard from "@/components/ui/text-card";
import ImageCard from "@/components/ui/image-card";
import { useState, useEffect } from "react";
import SavingsComponent from "@/components/ui/SavingsComponent";
import { useSession } from "next-auth/react";
import { Goal, Transaction} from "@/types/types";
import { Chart } from "react-google-charts";

interface GoalsResponse {
    goal: Goal
}

interface TransactionsResponse {
  Incomes: Transaction[],
  Expenses: Transaction[]
}


export default function Home() {

    const session = useSession();
    const [data, setData] = useState<Array<any>>([['Month', 'Amount']]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSavingsVisible, setIsSavingsVisible] = useState(false);
    const [savingsGoal, setSavingsGoal] = useState("0.00");
    const [savingsEstimate, setSavingsEstimate] = useState("");

    useEffect(() => {
        getUserSavingsGoal();
    }, [savingsGoal]);

    async function getUserSavingsGoal() {
        const url = `http://localhost:3000/api/goals/${session.data?.user?.id}`;
        const res = await fetch(url, {
            headers: { "Content-Type": "application/json"}
        });
        if (res.status === 200) {
            const goalRes = await res.json() as GoalsResponse;
            setSavingsGoal(parseInt(goalRes.goal.amount).toFixed(2));
            getUserTransactions(parseInt(goalRes.goal.amount));
        } else {
            setSavingsGoal("0.00");
        }
    }

    async function getUserTransactions(goal: number) {
        const url = `http://localhost:3000/api/transactions/${session.data?.user?.id}`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const Utransactions = await res.json() as TransactionsResponse;
        const incomes = Utransactions.Incomes;
        const expenses = Utransactions.Expenses;
        await calculateSumsForEachMonth(incomes, expenses, goal);
    }

    async function calculateSumsForEachMonth(incomes: Transaction[], expenses: Transaction[], goal: number) {
        let map = new Map<String, number>();
        let incomeSum = 0;
        let expenseSum = 0;

        incomes.forEach(income => {
            let key = income.date.substring(0, 7);
            map.set(key, (map.get(key) || 0.00) + parseFloat(income.amount));
            incomeSum += parseFloat(income.amount);
        });
        expenses.forEach(expense => {
            let key = expense.date.substring(0, 7);
            map.set(key, (map.get(key) || 0.00) - parseFloat(expense.amount));
            expenseSum += parseFloat(expense.amount);
        });
        
        let avgMonth = 0;

        for (const [key, value] of map) {
            map.set(key, value/30);
            avgMonth += (map.get(key) || 0);
        }
        
        avgMonth /= map.size;
        setSavingsEstimate(`At your current rate, it will take ${Math.ceil((goal - (incomeSum - expenseSum)) / avgMonth)} days to hit your savings goal!`);
        await fetchData(map);
    }

    async function fetchData(map: Map<String, number>) {
        try {
            let months = [];
            for (const [key, value] of map) {
                months.push([key, {v: parseFloat(value.toFixed(2)), f: `$${value.toFixed(2)}`}]);
            }
            months.sort((a,b) => new Date(a[0] as string).getTime() - new Date(b[0] as string).getTime());
          setData([
            ['Month', 'Amount'],
            ...months
          ]);
        } catch (error) {
          console.error('Error fetching chart data:', error);
        } finally {
          setIsLoading(false);
        }
      }

    
    function toggleSavingsComponent() {
        setIsSavingsVisible(!isSavingsVisible);
    }

    const options = {
        title: "Average daily savings per month",
        backgroundColor: 'transparent',
        legend: { position: 'bottom' },
        pieSliceText: 'value', // Show actual dollar values
        colors: ['#155eef', '#ea4335'],
      };
    
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
            </div>
                <div>
                    <p className="w-screen text-2xl font-semibold text-center">{savingsEstimate}</p>
                </div>
                <div className="flex justify-center">
                    {!isLoading && <Chart
                        chartType="LineChart"
                        data={data}
                        options={options}
                        width={'600px'}
                        height={'500px'}
                    />}
                </div>
            { isSavingsVisible && <div className="bg-black opacity-75 w-screen h-screen top-0 left-0 fixed"></div>}
            { isSavingsVisible && <SavingsComponent addFunction={getUserSavingsGoal} closeFunction={toggleSavingsComponent}></SavingsComponent>}
        </div>
    );
};