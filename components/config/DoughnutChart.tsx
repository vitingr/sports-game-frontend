import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, PointElement, LineElement, LinearScale, Title, BarElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { DoughnutProps } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const DoughnutChart = ({chartData, chartOptions}: DoughnutProps) => {
  return (
    <div className='max-w-[250px] min-h-[250px]'>
      <Chart type="doughnut" data={chartData} options={chartOptions} />
    </div>
  );
}

export default DoughnutChart