import { Button } from "@/components/ui/button";
import Link from "next/link";
import Card from "@/components/ui/card"
import ImageCard from "@/components/ui/image-card"
import TextCard from "@/components/ui/text-card";
import Image from "next/image";

export default function OverviewPage() {
    return (
      <div>
        <div className="grid grid-cols-2">
          <h1 className="text-4xl p-3 pl-6 font-semibold">Hello, User!</h1>
        </div>
        <div className="grid grid-cols-3 gap-6 m-6">
            {/* Text Cards */}
            <div>
              <TextCard heading="Balance" number={5502.45} numColor="text-[#155EEF]" />
            </div>
            <div>
              <TextCard heading="Incomes" number={9450.01} numColor="text-black" />
            </div>
            <div>
              <TextCard heading="Expenses" number={3945.55} numColor="text-black" />
            </div>
            {/* Image Cards */}
            <div>
            <ImageCard imageSrc="/Plus.png" imageAlt="Plus icon" imageBackground="bg-green-200">
              <h2 className="text-lg font-semibold text-gray-900">Add Income</h2>
            </ImageCard>
            </div>
            <div>
            <ImageCard imageSrc="/Minus.png" imageAlt="Minus icon" imageBackground="bg-red-200">
              <h2 className="text-lg font-semibold text-gray-900">Add Expense</h2>
            </ImageCard>
            </div>
            <div>
            <ImageCard imageSrc="/DollarSign.png" imageAlt="Dollar icon" imageBackground="bg-cyan-200">
              <h2 className="text-lg font-semibold text-gray-900">Set Savings Goal</h2>
            </ImageCard>
            </div>
        </div>
      </div>
    );
}