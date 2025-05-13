import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Pour la navigation
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Icône du mode clair
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Icône du mode sombre

const Navbar = ({ toggleTheme }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mon Application
        </Typography>

        {/* Liens de navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
            <Typography variant="body1">Accueil</Typography>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
            <Typography variant="body1">Dashboard</Typography>
          </Link>

          {/* Switch pour changer le mode */}
          <IconButton sx={{ color: 'inherit' }} onClick={toggleTheme}>
            {document.body.style.backgroundColor === 'rgb(0, 0, 0)' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
