import Image from "next/image";
import type { Transaction } from "@/types/types";

interface ViewTransactionComponentProps {
    transaction: Transaction,
    closeFunction: () => void
}

const ViewTransactionComponent = ({ transaction, closeFunction }: ViewTransactionComponentProps) => {
    return (
        <div className="flex fixed top-[15vh] left-[29vw] z-1000 justify-center border bg-white h-[500px] w-[600px] rounded-[10px]">
            <div className="flex flex-col items-center gap-4 pl-10 pr-10 pt-4 pb-4">
                <h1 className="text-2xl font-semibold font-sans">{transaction.title} - {transaction.date}</h1>
                <Image className="h-[250px] w-[250px]" alt={transaction.title} src={transaction.imageUrl} height={150} width={150}></Image>
                <p className="text-med text-gray-500 font-sans">{transaction.amount} | {transaction.paymentMethod}</p>
                <p className="text-center text-med font-sans">{transaction.description}</p>
                <br></br>
                <button className="bg-[#F04438] text-white rounded-sm min-h-[32px] min-w-[112px]" onClick={closeFunction}>Close</button>
            </div>
        </div>
    );
};

export default ViewTransactionComponent;