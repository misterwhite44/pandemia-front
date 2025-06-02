import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalDeathsChart = () => {
  const [data, setData] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState('COVID-19');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/globaldata')
      .then((res) => res.json())
      .then((fetchedData) => {
        if (!Array.isArray(fetchedData)) {
          console.error('La donnée reçue n’est pas un tableau :', fetchedData);
          return;
        }
        setData(fetchedData);
      })
      .catch((err) => console.error('Erreur lors du fetch :', err));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const filtered = data.filter((entry) => entry.disease?.name === selectedDisease);

    const grouped = {};
    filtered.forEach((entry) => {
      const country = entry.country?.name || 'Inconnu';
      const deaths = entry.totalDeaths || 0;

      if (!grouped[country]) grouped[country] = 0;
      grouped[country] += deaths;
    });

    const sortedCountries = Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sortedCountries.map(([country]) => country);
    const values = sortedCountries.map(([_, deaths]) => deaths);

    setChartData({
      labels,
      datasets: [
        {
          label: selectedDisease,
          data: values,
          backgroundColor: '#003f5c', // Bleu foncé pour meilleur contraste
        },
      ],
    });
  }, [data, selectedDisease]);

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          color: '#000',
          font: { weight: 'bold', size: 14 }
        }
      },
      title: {
        display: true,
        text: `Nombre total de morts par pays (${selectedDisease})`,
        color: '#000',
        font: { weight: 'bold', size: 16 }
      },
      tooltip: {
        bodyColor: '#000',
        backgroundColor: '#fff',
        borderColor: '#003f5c',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: { color: '#000' },
        grid: { color: '#ccc' }
      },
      y: {
        ticks: { color: '#000' },
        grid: { color: '#ccc' }
      }
    }
  };

  const diseaseOptions = [...new Set(data.map((entry) => entry.disease?.name).filter(Boolean))];

  return (
    <section
      role="region"
      aria-labelledby="total-deaths-chart-title"
      style={{ width: '100%', height: '100%', color: '#000' }}
    >
      <h3 id="total-deaths-chart-title">Nombre total de morts par pays et par maladie</h3>
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: 180,
          mb: 2,
          borderRadius: 3,
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        <InputLabel
          id="disease-select-label"
          sx={{
            borderRadius: 3,
            background: '#003f5c',
            px: 1,
            color: '#fff',
          }}
        >
          Choisir une maladie
        </InputLabel>
        <Select
          labelId="disease-select-label"
          value={selectedDisease}
          onChange={(e) => setSelectedDisease(e.target.value)}
          label="Choisir une maladie"
          sx={{
            borderRadius: 3,
            background: 'transparent',
            color: '#003f5c',
            fontWeight: 600,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#003f5c',
              borderRadius: 3,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#002f4a',
            },
            '& .MuiSvgIcon-root': {
              color: '#003f5c',
            },
          }}
          inputProps={{ 'aria-describedby': 'disease-select-helper' }}
        >
          {diseaseOptions.map((disease) => (
            <MenuItem
              key={disease}
              value={disease}
              sx={{ color: '#003f5c', background: 'transparent' }}
            >
              {disease}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div
        style={{ width: '100%', height: 'calc(100% - 120px)' }}
        aria-live="polite"
        aria-atomic="true"
      >
        {chartData ? (
          <Bar data={chartData} options={options} aria-label={`Graphique en barres montrant le nombre total de morts par pays pour ${selectedDisease}`} />
        ) : (
          <p>Chargement des données...</p>
        )}
      </div>

    </section>
  );
};

export default TotalDeathsChart;
