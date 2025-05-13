import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Chrome', 'Firefox', 'Edge'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#1976d2', '#f57c00', '#9c27b0'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
