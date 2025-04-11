import Card from "./card";
import Image from "next/image"

type TextCardProps = {
    heading: string;
    number: number;
    numColor: string;
  };

export default function TextCard({ heading, number, numColor }: TextCardProps) {
    return(
        <div>
            <Card>
                <div className="flex flex-col items-start gap-2 font-sans">
                    <h6 className="text-gray-500 text-sm">{heading}</h6>
                    <h1 className={`${numColor} text-4xl font-semibold`}>{`$${number}`}</h1>
                </div>
            </Card>
        </div>
    );
};