import React, { useState } from 'react';
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

  const handlePrediction = () => {
    // Adapte ici l'URL en fonction de ton API si besoin
    // Exemple avec params corrects (ajuste selon ta vraie API)
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
        // Stocker le JSON formaté en string
        setResultText(JSON.stringify(data.predictions || data, null, 2));
        setError(null);
        setShowGraph(false);
      })
      .catch(() => {
        setError('Erreur lors de la récupération de la prédiction.');
        setResultText(null);
        setImageUrl(null);
        setShowGraph(false);
      });
  };

  // Parse le JSON stocké en string dans resultText pour créer les données graphiques
  const parseChartData = () => {
    if (!resultText) return [];
    try {
      const data = JSON.parse(resultText);
      return Object.entries(data).map(([dayIndex, prediction]) => {
        const dayObj = { day: `Jour ${Number(dayIndex) + 1}` };
        targets.forEach((target) => {
          dayObj[target] = parseFloat(prediction[`predicted_${target}`] || 0);
        });
        return dayObj;
      });
    } catch {
      return [];
    }
  };

  const chartData = parseChartData();

  // Calcul des min/max pour le YAxis avec une marge
  const allValues = chartData.flatMap(d => targets.map(t => d[t] || 0));
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
                onChange={(e) => setTargets(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
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
                >
                  Lancer la prédiction
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setShowGraph(true)}
                  sx={{ borderRadius: 2 }}
                  disabled={!resultText}
                >
                  Afficher le graphique
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" sx={{ mt: 3 }}>
              {error}
            </Typography>
          )}

          {resultText && (
            <Box mt={4} textAlign="left">
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Résultat :
              </Typography>
              <Paper
                sx={{
                  backgroundColor: 'grey.900',
                  color: 'common.white',
                  padding: 2,
                  borderRadius: 2,
                  overflowX: 'auto',
                }}
              >
                <pre style={{ color: 'inherit', whiteSpace: 'pre-wrap' }}>
                  {resultText}
                </pre>
              </Paper>
            </Box>
          )}

          {showGraph && chartData.length > 0 && (
            <Box mt={4}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Graphique de la prédiction :
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[minValue - margin, maxValue + margin]} />
                  <Tooltip />
                  {targets.map((target, idx) => (
                    <Line
                      key={target}
                      type="monotone"
                      dataKey={target}
                      stroke={['#1976d2', '#d32f2f', '#2e7d32'][idx % 3]}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>

              {imageUrl && (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = imageUrl;
                      link.download = `prediction_${country}_${daysAhead}j.png`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Télécharger le graphique
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PredictionForm;
