type PaymentMethod = {
    cardNetwork: string,
    lastFourDigits: string
}

interface ExpenseProps {
    title: string,
    paymentMethods: PaymentMethod[]
}

const AddComponent = ({ title, paymentMethods }: ExpenseProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen min-w-screen bg-red-700">
            <div className="flex justify-center bg-white h-[570px] w-80 rounded-[10px]">
                <form className="relative w-4/5">
                    <h1 className="font-semibold text-xl text-center mt-6 mb-4">Add {title}</h1>
                    <label className="text-sm font-semibold">Title</label>
                    <br></br>
                    <input type="text" placeholder="Enter title" className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2"></input>
                    <br className="mb-6"></br>
                    <label className="text-sm font-semibold">Amount</label>
                    <br></br>
                    <input type="text" placeholder="Enter amount" className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2"></input>
                    <br className="mb-6"></br>
                    <label className="text-sm font-semibold">Date</label>
                    <br></br>
                    <input type="date" placeholder="mm/dd/yyyy" className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2"></input>
                    <br className="mb-6"></br>
                    <label className="text-sm font-semibold">Payment Method</label>
                    <br></br>
                    <select className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2">
                        { paymentMethods.map((option) => {
                            return <option key={option.lastFourDigits} value={option.cardNetwork + " " + option.lastFourDigits}>{option.cardNetwork + " " + option.lastFourDigits}</option>
                        })}
                    </select>
                    <br className="mb-6"></br>
                    <label className="text-sm font-semibold">Description</label>
                    <br></br>
                    <textarea placeholder="Enter description" className="border border-[#A6BCDA] min-w-[256px] min-h-[85px] max-h-[85px] text-sm rounded-sm pt-2 pl-2 resize-none"></textarea>
                    <br className="mb-[24px]"></br>
                    <button type="button" className="bg-[#F04438] text-white rounded-sm min-h-[32px] min-w-[112px] mr-[32px]">Cancel</button>
                    <button type="submit" className="bg-[#155EEF] text-white rounded-sm min-h-[32px] min-w-[112px]">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddComponent;