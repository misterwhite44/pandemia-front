import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const countries = ['France', 'Germany', 'Italy', 'Spain', 'United States', 'India', 'Brazil'];
const targetOptions = ['new_cases', 'new_deaths', 'new_recovered'];
const API_KEY = process.env.REACT_APP_API_KEY;

const PredictionForm = () => {
  const [country, setCountry] = useState('France');
  const [daysAhead, setDaysAhead] = useState(7);
  const [targets, setTargets] = useState(['new_cases']);
  const [resultText, setResultText] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = () => {
    setIsLoading(true);
    const url = `http://localhost:8000/api/v1/predict?country_name=${country}&days_ahead=${daysAhead}&targets=${targets.join(',')}`;

    fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    })
        .then((res) => {
          if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setImageUrl(data.image_path ? `http://localhost:8000/${data.image_path}` : null);
          setResultText(JSON.stringify(data.predictions || {}, null, 2)); // Optionnel si vous ne voulez pas afficher les données brutes
          setError(null);
          setShowGraph(true); // Affiche directement le graphique
        })
        .catch(() => {
          setError('Erreur lors de la récupération de la prédiction.');
          setImageUrl(null);
          setShowGraph(false);
        })
        .finally(() => {
          setIsLoading(false); // Arrête le loader
        });
  };

  const parseChartData = () => {
    if (!resultText) return { new_cases: [], new_deaths: [], new_recovered: [] };
    try {
      const predsObj = JSON.parse(resultText);
      const chartData = {};

      targets.forEach((target) => {
        chartData[target] = predsObj[target]?.map((entry, i) => ({
          day: `Jour ${i + 1}`,
          value: parseFloat(entry[`predicted_${target}`] || 0),
        })) || [];
      });

      return chartData;
    } catch {
      return { new_cases: [], new_deaths: [], new_recovered: [] };
    }
  };

  const chartData = parseChartData();
  const allValues = Object.values(chartData)
      .flat()
      .map((entry) => entry.value || 0);
  const minValue = Math.min(...allValues, 0);
  const maxValue = Math.max(...allValues, 1);
  const margin = (maxValue - minValue) * 0.1 || 0.0001;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, sm: 5, md: 7 } }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Prédiction IA COVID
          </Typography>

          <Grid container spacing={3} justifyContent="center" mt={1}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Pays"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Nombre de jours à prévoir"
                value={daysAhead}
                onChange={(e) => setDaysAhead(Number(e.target.value))}
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Cibles à prédire"
                value={targets}
                onChange={(e) =>
                  setTargets(typeof e.target.value === 'string'
                    ? e.target.value.split(',')
                    : e.target.value
                  )
                }
                SelectProps={{ multiple: true }}
              >
                {targetOptions.map((target) => (
                  <MenuItem key={target} value={target}>
                    {target}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrediction}
                  sx={{ borderRadius: 2, px: 4, py: 1.5 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Chargement...' : 'Lancer la prédiction'}
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {isLoading && (
              <Box mt={3}>
                <CircularProgress color="primary" />
              </Box>
          )}

          {error && (
            <Typography color="error" sx={{ mt: 3 }}>
              {error}
            </Typography>
          )}

          {showGraph && Object.keys(chartData).length > 0 && (
              <Box mt={4}>
                {targets.map((target, idx) => (
                    <Box key={target} mt={4}>
                      <Typography variant="h6" fontWeight="medium" gutterBottom>
                        Graphique de la prédiction : {target.replace('_', ' ')}
                      </Typography>
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData[target]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Line
                              type="monotone"
                              dataKey="value"
                              stroke={['#1976d2', '#d32f2f', '#2e7d32'][idx % 3]}
                              strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                ))}
              </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PredictionForm;
