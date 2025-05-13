import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container>
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
