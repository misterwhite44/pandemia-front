import React, { useState } from 'react';
import { Box, Container, Paper, Typography, Button } from '@mui/material';

const Ia = () => {
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    const randomValue = Math.random();
    let result = 'Risque faible';
    if (randomValue > 0.7) result = 'Risque élevé';
    else if (randomValue > 0.4) result = 'Risque moyen';

    setPrediction(result);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Prédiction IA
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Clique sur le bouton pour lancer une prédiction.
          </Typography>
          <Button variant="contained" onClick={handlePredict}>
            Lancer la prédiction
          </Button>
          {prediction && (
            <Typography variant="h6" sx={{ mt: 3 }}>
              Résultat : {prediction}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Ia;
