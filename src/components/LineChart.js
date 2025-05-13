import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const LineChart = () => {
  const data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril'],
    datasets: [
      {
        label: 'Ventes',
        data: [10, 40, 30, 80],
        fill: false,
        borderColor: 'cyan',
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
