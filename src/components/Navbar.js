import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom'; 
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import Brightness4Icon from '@mui/icons-material/Brightness4'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PublicIcon from '@mui/icons-material/Public';

const Navbar = ({ toggleTheme }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mon Application
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
            <Typography variant="body1">Accueil</Typography>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
            <Typography variant="body1">Dashboard</Typography>
          </Link>
          <Link to="/dataset" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
            <Typography variant="body1">Dataset</Typography>
          </Link>
          <Link to="/api" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
            <Typography variant="body1">API</Typography>
          </Link>

          {/* Icône monde vers la page /map */}
          <Link to="/map" style={{ color: 'white', marginRight: '20px' }}>
            <IconButton sx={{ color: 'inherit' }}>
              <PublicIcon />
            </IconButton>
          </Link>

          <Link to="/profile" style={{ color: 'white', marginRight: '20px' }}>
            <IconButton sx={{ color: 'inherit' }}>
              <AccountCircleIcon />
            </IconButton>
          </Link>

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
