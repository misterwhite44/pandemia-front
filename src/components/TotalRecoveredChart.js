import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TotalRecoveredChart = () => {
  const [chartData, setChartData] = useState(null);

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  useEffect(() => {
    fetch('http://localhost:8080/globaldata')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('Les données ne sont pas un tableau :', data);
          return;
        }

        const filteredData = data
          .filter((entry) => entry.totalRecovered && entry.totalRecovered > 0)
          .sort((a, b) => b.totalRecovered - a.totalRecovered)
          .slice(0, 10);

        const labels = filteredData.map(
          (entry) => `${entry.country.name} (${entry.disease.name})`
        );
        const values = filteredData.map((entry) => entry.totalRecovered);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Cas guéris',
              data: values,
              backgroundColor: '#4caf50',
            },
          ],
        });
      })
      .catch((err) => console.error('Erreur lors du fetch :', err));
  }, []);

  if (!chartData) return <p>Chargement des données...</p>;

  return (
    <div style={{ height: '400px' }}>
      <h3>Nombre total de cas guéris (par pays et maladie)</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TotalRecoveredChart;
