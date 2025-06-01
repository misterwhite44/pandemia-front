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
          color: '#000',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
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
          .filter((entry) => entry.disease.name === 'Monkeypox' && entry.totalCases)
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
                '#003f5c', // Bleu foncé
                '#58508d', // Violet
                '#bc5090', // Rose foncé
                '#ff6361', // Rouge orangé
                '#ffa600'  // Jaune foncé
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
      aria-labelledby="chart-monkeypox-title"
      style={{ color: '#000' }}
    >
      <h3 id="chart-monkeypox-title">Pays les plus touchés par le Monkeypox</h3>
      <div style={{ width: '300px', height: '300px' }}>
        <Pie data={chartData} options={options} aria-label="Diagramme circulaire des cas Monkeypox par pays" />
      </div>

      <div>
        <h4>Données textuelles pour accessibilité :</h4>
        <ul>
          {chartData.labels.map((label, i) => (
            <li key={label} style={{ color: '#000' }}>
              {label} : {chartData.datasets[0].data[i].toLocaleString()} cas
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PieChart;
