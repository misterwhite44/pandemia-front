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
      const country = entry.country?.name;
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
          backgroundColor: '#1976d2',
        },
      ],
    });
  }, [data, selectedDisease]);

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Nombre total de morts par pays (${selectedDisease})`,
      },
    },
  };

  const diseaseOptions = [...new Set(data.map((entry) => entry.disease?.name))];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h3>Nombre total de morts par pays et par maladie</h3>
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: 140,
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
            background: 'rgba(25, 118, 210, 0.8)',
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
            color: '#fff',
            fontWeight: 600,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
              borderRadius: 3,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1565c0',
            },
            '& .MuiSvgIcon-root': {
              color: '#1976d2',
            },
          }}
        >
          {diseaseOptions.map((disease) => (
            <MenuItem key={disease} value={disease} sx={{ color: '#fff', background: 'transparent' }}>
              {disease}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ width: '100%', height: 'calc(100% - 100px)' }}>
        {chartData ? <Bar data={chartData} options={options} /> : <p>Chargement des données...</p>}
      </div>
    </div>
  );
};

export default TotalDeathsChart;
