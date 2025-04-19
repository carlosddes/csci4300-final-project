import { FaCircle } from "react-icons/fa";

interface ChartCategoryProps {
    categoryInfo: {
        category: string,
        percentage: string
        color: string,
    }
};

const ChartCategory = ({ categoryInfo }: ChartCategoryProps) => {
    return (
        <div>
            <div className="flex flex-row justify-left gap-6">
                <FaCircle className={`${categoryInfo.color} w-6 h-6`} />
                <p className="font-sans font-medium">{categoryInfo.category} - {categoryInfo.percentage}</p>
            </div>
        </div>
    );
};

export default ChartCategory;