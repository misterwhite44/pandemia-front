import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenue sur la page d'accueil
      </Typography>
      <Typography>
        Cette page est accessible à partir de la racine du site.
      </Typography>
    </Container>
  );
};

export default Home;
