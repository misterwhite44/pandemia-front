import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100vh' }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Accueil" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
