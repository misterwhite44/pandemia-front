import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

const BarChart = () => {
  const data = {
    labels: ['Produit A', 'Produit B', 'Produit C'],
    datasets: [
      {
        label: 'Stocks',
        data: [50, 75, 30],
        backgroundColor: 'orange',
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
