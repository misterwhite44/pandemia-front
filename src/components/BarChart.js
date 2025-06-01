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
        const wcagColors = ['#42a5f5', '#ef5350', '#66bb6a', '#ffa726', '#ab47bc', '#26c6da'];
        const backgroundColors = labels.map((_, i) => wcagColors[i % wcagColors.length]);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total des cas COVID-19 par continent',
              data: values,
              backgroundColor: backgroundColors
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
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Cas COVID-19 par continent',
        color: '#ffffff',
        font: {
          size: 18,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 30,
          color: '#ffffff'
        },
        grid: {
          color: '#444444'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: '#444444'
        }
      }
    }
  };

  if (!chartData) return <p style={{ color: '#ffffff' }}>Chargement des données...</p>;

  return (
    <div style={{ height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
