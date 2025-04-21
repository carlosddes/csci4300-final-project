'use client';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

export default function DonutChart() {
  const [data, setData] = useState<Array<any>>([['Type', 'Amount']]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/chart-data');
        const json = await res.json();
        setData([
          ['Type', 'Amount'],
          ['Income', { v: json[1][1], f: `$${json[1][1].toFixed(2)}` }],
          ['Expenses', { v: json[2][1], f: `$${json[2][1].toFixed(2)}` }],
        ]);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const options = {
    title: 'Income vs Expenses',
    pieHole: 0.4,
    legend: { position: 'bottom' },
    pieSliceText: 'value', // Show actual dollar values
    colors: ['#155eef', '#ea4335'],
  };

  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={'600px'}
          height={'400px'}
        />
      )}
    </div>
  );
}
