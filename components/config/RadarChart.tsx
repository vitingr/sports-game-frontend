import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, PointElement, LineElement, LinearScale, RadialLinearScale } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { DoughnutProps } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, PointElement, LineElement, LinearScale, RadialLinearScale);

const RadarChart = ({chartData, chartOptions}: DoughnutProps) => {
  return (
    <div className='max-w-[525px] min-h-[225px] h-full'>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
}

export default RadarChart