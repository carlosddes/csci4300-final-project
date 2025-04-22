'use client';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

interface ChartProps {
  incomes: string,
  expenses: string
}

export default function DonutChart( {incomes, expenses}: ChartProps ) {
  const [data, setData] = useState<Array<any>>([['Type', 'Amount']]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setData([
          ['Type', 'Amount'],
          ['Income', { v: parseFloat(incomes), f: `$${incomes}` }],
          ['Expenses', { v: parseFloat(expenses), f: `$${expenses}` }],
        ]);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [incomes, expenses]);

  const options = {
    backgroundColor: 'transparent',
    pieHole: 0.6,
    legend: { position: 'bottom' },
    pieSliceText: 'value', // Show actual dollar values
    colors: ['#155eef', '#ea4335'],
  };

  return (      
    <div className="flex flex-col justify-center items-center min-h-[75vh] min-w-[30.8vw] bg-opacity-0 rounded-xl border border-[#ECEFF2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
      <div className="flex flex-col rounded-t-xl ">
          <h1 className="text-base font-semibold font-sans">Income vs Expenses</h1>
      </div>
    {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={'500px'}
          height={'400px'}
        />
      )}
    </div>
  );
}
