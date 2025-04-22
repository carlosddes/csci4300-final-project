import Image from "next/image"

interface TransactionCardProps {
    transaction: {
        title: string,
        amount: string,
        date: string,
        description: string,
        imageURL: string,
        paymentMethod: string,
    }
};

const TransactionCard = ({ transaction }: TransactionCardProps) => {
    return (
        <div className="flex mt-10 justify-center">
            <div className="h-[335px] w-[25vw] rounded-xl border border-[#ECEFF2] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.2)]">
                <div className="flex flex-col items-center gap-4 pl-10 pr-10 pt-4 pb-4">
                    <h1 className="font-semibold font-sans">{transaction.title} - {transaction.date}</h1>
                    <Image className="h-[150px] w-[150px]" alt={transaction.title} src={transaction.imageURL} height={150} width={150}></Image>
                    <p className="text-sm text-gray-500 font-sans">{transaction.amount} | {transaction.paymentMethod}</p>
                    <p className="text-center text-xs font-sans">{transaction.description}</p>
                </div>
            </div>
        </div>
    )
};

export default TransactionCard;