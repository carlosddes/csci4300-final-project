import type { Transaction } from "@/types/types"

interface ConfirmDeleteProps {
    title: string,
    transaction: Transaction,
    closeFunction: () => void
}

const ConfirmDelete = ({ title, transaction, closeFunction }: ConfirmDeleteProps) => {
    
    async function handleDelete() {
        const url = title === "Expense" ? `http://localhost:3000/api/expense/${transaction._id}` : `http://localhost:3000/api/income/${transaction._id}`;
        const res = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"},
        });
        closeFunction();
    }

    return (
        <div className="flex fixed top-[30vh] left-[40vw] z-1000 justify-center border bg-white h-[180px] w-80 rounded-[10px]">
            <form onSubmit={e=> {e.preventDefault(); handleDelete()}} className="relative w-4/5">
                <h1 className="font-semibold text-med text-center mt-6 mb-4">Are you sure you want to delete this transaction?</h1>
                <br></br>
                <button type="button" className="bg-[#F04438] text-white rounded-sm min-h-[32px] min-w-[112px] mr-[30px]" onClick={closeFunction}>Cancel</button>
                <button type="submit" className="bg-[#155EEF] text-white rounded-sm min-h-[32px] min-w-[112px]">Confirm</button>
            </form>
        </div>
    );
}

export default ConfirmDelete;