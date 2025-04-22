const EmptyCard = () => {
    return (
        <div className="flex mt-10 justify-center">
            <div className="h-[335px] w-[25vw] rounded-xl border border-[#ECEFF2] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.2)]">
                <div className="flex text-center justify-center items-center gap-4 pl-10 pr-10 pt-4 pb-4">
                    <h1 className="font-semibold text-lg text-center font-sans">No transactions available</h1>
                </div>
            </div>
        </div>
    )
};

export default EmptyCard;