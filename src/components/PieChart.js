import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  const options = {
    maintainAspectRatio: false,
  };

  useEffect(() => {
    fetch('http://localhost:8080/globaldata')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('La donnée reçue n’est pas un tableau :', data);
          return;
        }

        const filteredData = data
          .filter((entry) => entry.disease.name === 'COVID-19' && entry.totalCases)
          .sort((a, b) => b.totalCases - a.totalCases)
          .slice(0, 5);

        const labels = filteredData.map((entry) => entry.country.name);
        const values = filteredData.map((entry) => entry.totalCases);

        setChartData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ['#1976d2', '#f57c00', '#9c27b0', '#4caf50', '#e91e63'],
            },
          ],
        });
      })
      .catch((err) => console.error('Erreur lors du fetch :', err));
  }, []);

  if (!chartData) return <p>Chargement des données...</p>;

  return (
    <div>
      <h3>Pays les plus touchés par le Covid-19</h3>
      <div style={{ width: '300px', height: '300px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
