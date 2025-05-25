import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PublicIcon from '@mui/icons-material/Public';
import MemoryIcon from '@mui/icons-material/Memory';
import { Link } from 'react-router-dom';

const navItems = [
  { text: 'Accueil', path: '/' },
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Dataset', path: '/dataset' },
  { text: 'API', path: '/api' },
];

const iconLinks = [
  { icon: <PublicIcon />, path: '/map', label: 'Carte', ariaLabel: 'Aller à la carte' },
  { icon: <MemoryIcon />, path: '/ia', label: 'IA', ariaLabel: 'Aller à l\'IA' },
  { icon: <AccountCircleIcon />, path: '/profile', label: 'Profil', ariaLabel: 'Voir le profil' },
];

const Navbar = ({ toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Mon Application
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ text, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={path}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {iconLinks.map(({ icon, path, label }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton component={Link} to={path}>
              {icon}
              <ListItemText primary={label} sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {document.body.style.backgroundColor === 'rgb(0, 0, 0)' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pandemia
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map(({ text, path }) => (
                <Link
                  key={text}
                  to={path}
                  style={{ textDecoration: 'none', color: 'inherit', marginRight: 20 }}
                >
                  <Typography variant="body1">{text}</Typography>
                </Link>
              ))}

              {iconLinks.map(({ icon, path, label }) => (
                <Link
                  key={label}
                  to={path}
                  style={{ color: 'inherit', marginRight: 20, display: 'flex', alignItems: 'center' }}
                  aria-label={label}
                >
                  <IconButton color="inherit">{icon}</IconButton>
                </Link>
              ))}

              <IconButton sx={{ color: 'inherit' }} onClick={toggleTheme}>
                {document.body.style.backgroundColor === 'rgb(0, 0, 0)' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
