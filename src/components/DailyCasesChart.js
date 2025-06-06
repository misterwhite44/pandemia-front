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
import { FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyCasesChart = () => {
  const theme = useTheme();

  const [data, setData] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState('COVID-19');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/api/globaldata')
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

    // Couleurs WCAG fixes, ça ne change pas avec le thème
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
          color: theme.palette.text.primary,
        },
      },
      title: {
        display: true,
        text: `Pays les plus touchés quotidiennement (${selectedDisease})`,
        color: theme.palette.text.primary,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: theme.palette.divider,
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
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: 16,
          color: theme.palette.text.primary,
        }}
      >
        Pays les plus touchés quotidiennement
      </h3>
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: 140,
          mb: 2,
          borderRadius: 3,
          background: theme.palette.action.selected, // fond adaptable
        }}
      >
        <InputLabel
          id="disease-select-label"
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.background.paper,
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
            color: theme.palette.text.primary,
            fontWeight: 600,
            borderRadius: 3,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.dark,
            },
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary.main,
            },
          }}
        >
          {diseaseOptions.map((disease) => (
            <MenuItem
              key={disease}
              value={disease}
              sx={{
                color: theme.palette.text.primary,
                background: theme.palette.background.paper,
                '&:hover': {
                  background: theme.palette.action.hover,
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
          <p style={{ color: theme.palette.text.primary }}>Chargement des données...</p>
        )}
      </div>
    </div>
  );
};

export default DailyCasesChart;
