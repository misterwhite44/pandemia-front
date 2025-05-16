import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/globaldata')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('La donnée reçue n’est pas un tableau :', data);
          return;
        }

        const continentTotals = {};

        data.forEach((entry) => {
          const disease = entry.disease?.name;
          const continent = entry.country?.continent?.name;
          const cases = entry.totalCases;

          if (disease === 'COVID-19' && continent && cases) {
            continentTotals[continent] = (continentTotals[continent] || 0) + cases;
          }
        });

        const labels = Object.keys(continentTotals);
        const values = Object.values(continentTotals);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total des cas COVID-19 par continent',
              data: values,
              backgroundColor: '#42a5f5'
            }
          ]
        });
      })
      .catch((err) => console.error('Erreur lors du fetch :', err));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Cas COVID-19 par continent'
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 30
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  if (!chartData) return <p>Chargement des données...</p>;

  return (
    <div style={{ height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
