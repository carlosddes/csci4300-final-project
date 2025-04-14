import Chart from "./Chart";
import ChartCategory from "./ChartCategory";

const ChartView = () => {
    return (
        <div className="flex flex-col min-h-[75vh] min-w-[31vw] bg-opacity-0 rounded-xl border border-[#ECEFF2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
            <div className="flex flex-col rounded-t-xl h-[90px] p-5 gap-2">
                <h1 className="text-base font-semibold font-sans">Expenses by category</h1>
            </div>
            <div className="flex flex-col justify-center items-center gap-6">
                <div>
                    <Chart />
                </div>
                <div className="flex flex-col gap-2">
                    <ChartCategory categoryInfo={ {category: "House", percentage: "41.35%", color: "#4E5BA6"}}/>
                    <ChartCategory categoryInfo={ {category: "Credit Card", percentage: "21.51%", color: "#F04438"}}/>
                    <ChartCategory categoryInfo={ {category: "Transportation", percentage: "13.47%", color: "#0BA5EC"}}/>
                    <ChartCategory categoryInfo={ {category: "Groceries", percentage: "9.97%", color: "#17B26A"}}/>
                    <ChartCategory categoryInfo={ {category: "Other", percentage: "13.70%", color: "#ECEFF2"}}/>
                </div>
            </div>
        </div>
    );
};

export default ChartView;