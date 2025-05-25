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
} from '@mui/material';

const countries = ['France', 'Germany', 'Italy', 'Spain', 'United States', 'India', 'Brazil'];

const PredictionForm = () => {
  const [country, setCountry] = useState('France');
  const [daysAhead, setDaysAhead] = useState(7);
  const [resultText, setResultText] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handlePrediction = () => {
    const url = `http://localhost:8000/api/v1/predict?target=new_cases&country_name=${country}&days_ahead=${daysAhead}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur HTTP');
        return res.json();
      })
      .then((data) => {
        setImageUrl(data.image_path ? `http://localhost:8000/${data.image_path}` : null);
        setResultText(JSON.stringify(data.prediction || data, null, 2));
        setError(null);
      })
      .catch(() => {
        setError('Erreur lors de la récupération de la prédiction.');
        setResultText(null);
        setImageUrl(null);
      });
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        py: { xs: 3, sm: 5, md: 7 },
      }}
    >
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
                onChange={(e) => setDaysAhead(e.target.value)}
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                aria-label="Lancer la prédiction"
                color="primary"
                onClick={handlePrediction}
                sx={{ mt: 1, borderRadius: 2, px: 4, py: 1.5 }}
              >
                Lancer la prédiction
              </Button>
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

          {imageUrl && (
            <Box mt={4}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Graphique de la prédiction :
              </Typography>
              <img
                src={imageUrl}
                alt="Prédiction"
                style={{ width: '100%', borderRadius: 12, maxHeight: 500 }}
              />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PredictionForm;
