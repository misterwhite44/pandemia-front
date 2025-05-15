import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

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

          if (disease === 'Covid-19' && continent && cases) {
            continentTotals[continent] = (continentTotals[continent] || 0) + cases;
          }
        });

        const labels = Object.keys(continentTotals);
        const values = Object.values(continentTotals);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total des cas Covid-19 par continent',
              data: values,
              backgroundColor: '#f57c00',
            },
          ],
        });
      })
      .catch((err) => console.error('Erreur lors du fetch :', err));
  }, []);

  if (!chartData) return <p>Chargement des données...</p>;

  return <Bar data={chartData} />;
};

export default BarChart;
