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

const DailyCasesChart = () => {
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
      const newCases = entry.newCases || 0;
      if (!grouped[country]) grouped[country] = 0;
      grouped[country] += newCases;
    });

    const sortedCountries = Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sortedCountries.map(([country]) => country);
    const values = sortedCountries.map(([_, cases]) => cases);

    const wcagColors = ['#42a5f5', '#ef5350', '#66bb6a', '#ffa726', '#ab47bc'];

    setChartData({
      labels,
      datasets: [
        {
          label: selectedDisease,
          data: values,
          backgroundColor: wcagColors.slice(0, labels.length),
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
        labels: {
          color: '#ffffff',
        },
      },
      title: {
        display: true,
        text: `Pays les plus touchés quotidiennement (${selectedDisease})`,
        color: '#ffffff',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: '#444444',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: '#444444',
        },
      },
    },
  };

  const diseaseOptions = [...new Set(data.map((entry) => entry.disease?.name))].filter(Boolean);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 24,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, color: '#ffffff' }}>
        Pays les plus touchés quotidiennement
      </h3>
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: 140,
          mb: 2,
          borderRadius: 3,
          background: 'rgba(25, 118, 210, 0.15)',
        }}
      >
        <InputLabel
          id="disease-select-label"
          sx={{
            color: '#ffffff',
            background: 'rgba(25, 118, 210, 0.8)',
            px: 1,
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
            color: '#ffffff',
            fontWeight: 600,
            borderRadius: 3,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
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
            <MenuItem
              key={disease}
              value={disease}
              sx={{
                color: '#ffffff',
                background: '#1e1e1e',
                '&:hover': {
                  background: '#333',
                },
              }}
            >
              {disease}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ width: '100%', height: '100%', flexGrow: 1, position: 'relative' }}>
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p style={{ color: '#ffffff' }}>Chargement des données...</p>
        )}
      </div>
    </div>
  );
};

export default DailyCasesChart;
