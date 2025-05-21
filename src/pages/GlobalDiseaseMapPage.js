import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import GlobalDiseaseMap from '../components/GlobalDiseaseMap';

const GlobalDiseaseMapPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carte Informative Globale sur les Maladies
      </Typography>
      <Paper sx={{ p: 2, height: { xs: 400, md: 600 }, width: '100%' }}>
        <GlobalDiseaseMap />
      </Paper>
    </Container>
  );
};

export default GlobalDiseaseMapPage;
