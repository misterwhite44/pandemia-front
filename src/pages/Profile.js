import React from 'react';
import { Typography, Container } from '@mui/material';

const Profile = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mon Profil
      </Typography>
      <Typography variant="body1">
        Bienvenue sur votre page de profil. Cette section peut contenir vos informations personnelles, préférences, etc.
      </Typography>
    </Container>
  );
};

export default Profile;
