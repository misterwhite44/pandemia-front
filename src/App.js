import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importation de Routes à la place de Switch
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Dataset from './pages/Dataset';
import Api from './pages/Api';
import GlobalDiseaseMapPage from './pages/GlobalDiseaseMapPage';
import Ia from './pages/Ia'; 


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applique le thème global */}
      <Router>
        <Navbar toggleTheme={toggleTheme} />
        <Routes> {/* Remplace Switch par Routes */}
          <Route exact path="/" element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dataset" element={<Dataset />} /> 
          <Route path="/api" element={<Api />} />
          <Route path="/map" element={<GlobalDiseaseMapPage />} />
          <Route path="/ia" element={<Ia />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
