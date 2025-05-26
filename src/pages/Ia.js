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
const API_KEY = 'ihYY5!PWWK96JzUw@E^wBKAbMT49s*eX&Pnvq*5';

const PredictionForm = () => {
  const [country, setCountry] = useState('France');
  const [daysAhead, setDaysAhead] = useState(7);
  const [resultText, setResultText] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  const handlePrediction = () => {
    const url = `http://localhost:8000/api/v1/predict?target=new_cases&country_name=${country}&days_ahead=${daysAhead}`;

    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setImageUrl(data.image_path ? `http://localhost:8000/${data.image_path}` : null);
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

  const parseChartData = () => {
    try {
      const data = JSON.parse(resultText);
      // data est un objet, on mappe ses clés
      return Object.entries(data).map(([key, value]) => ({
        day: `Jour ${Number(key) + 1}`,
        value: parseFloat(value.predicted_new_cases)
      }));
    } catch {
      return [];
    }
  };

  // Calcule min et max pour domain Y Axis avec marge
  const chartData = parseChartData();
  const values = chartData.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const margin = (maxValue - minValue) * 0.1 || 0.0001; // si toutes valeurs identiques, marge fixe

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

          {showGraph && (
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
                  <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>

              {imageUrl && (
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
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Télécharger le graphique
                </Button>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PredictionForm;
