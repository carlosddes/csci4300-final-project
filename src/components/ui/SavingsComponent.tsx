interface SavingsProps {
    closeFunction: () => void
}

const SavingsComponent = ({ closeFunction }: SavingsProps) => {
    return (
        <div className="flex fixed top-[5vh] left-[40vw] z-1000 justify-center border bg-white h-[200px] w-80 rounded-[10px]">
            <form className="relative w-4/5">
                <h1 className="font-semibold text-xl text-center mt-6 mb-4">Set Savings Goal</h1>
                <label className="text-sm font-semibold">Amount</label>
                <br></br>
                <input type="text" placeholder="Enter Amount" className="border border-[#A6BCDA] min-w-[256px] min-h-[36px] max-h-[36px] text-sm rounded-sm p-2" required></input>
                <br className="mb-[24px]"></br>
                <button type="button" className="bg-[#F04438] text-white rounded-sm min-h-[32px] min-w-[112px] mr-[30px]" onClick={closeFunction}>Cancel</button>
                <button type="submit" className="bg-[#155EEF] text-white rounded-sm min-h-[32px] min-w-[112px]" onClick={closeFunction}>Set</button>
            </form>
        </div>
    );
};

export default SavingsComponent;