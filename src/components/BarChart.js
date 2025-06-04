import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Cas COVID-19 par continent',
        color: '#000000',
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
          color: '#000000'  // texte noir
        },
        grid: {
          color: '#ffffff'  // grille blanche
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#000000'  // texte noir
        },
        grid: {
          color: '#ffffff'  // grille blanche
        }
      }
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/globaldata')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

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
      .catch(() => {});
  }, []);

  if (!chartData) return <p>Chargement des données...</p>;

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography
        variant="h6"
        component="h3"
        align="center"
        sx={{ mb: 2, fontWeight: 'bold' }}
      >
        Total des cas COVID-19 par continent
      </Typography>

      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default BarChart;
