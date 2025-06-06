import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#000', // Texte noir pour bon contraste
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  useEffect(() => {
    fetch('/api/globaldata')
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
              backgroundColor: [
                '#003f5c', // bleu foncé
                '#58508d', // violet
                '#bc5090', // rose foncé
                '#ff6361', // rouge orangé
                '#ffa600'  // jaune foncé
              ],
            },
          ],
        });
      })
      .catch((err) => console.error('Erreur lors du fetch :', err));
  }, []);

  if (!chartData) return <p>Chargement des données...</p>;

  return (
    <div
      role="region"
      aria-labelledby="chart-title"
      style={{ color: '#000' }}
    >
      <h3 id="chart-title">Pays les plus touchés par le Covid-19</h3>
      <div style={{ width: '300px', height: '300px' }}>
        <Pie data={chartData} options={options} aria-label="Diagramme circulaire des cas COVID-19 par pays" />
      </div>


    </div>
  );
};

export default PieChart;
