import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const Api = () => {
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const continentsResponse = await axios.get('/api/continents');
        setContinents(continentsResponse.data);

        const countriesResponse = await axios.get('/api/countries');
        setCountries(countriesResponse.data);

        const globalDataResponse = await axios.get('/api/globaldata');
        setGlobalData(globalDataResponse.data);

        const regionsResponse = await axios.get('/api/regions');
        setRegions(regionsResponse.data);

        const diseasesResponse = await axios.get('/api/diseases');
        setDiseases(diseasesResponse.data);
      } catch (err) {
        console.error('Erreur lors du chargement des données :', err);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Données - Continents, Pays, Global Data, Régions et Maladies
      </Typography>

      {/* Section Continents */}
      <Paper sx={{ my: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Continents
        </Typography>
        <List>
          {continents.slice(0, 5).map((continent, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={JSON.stringify(continent)} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {continents.length > 5 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ...({continents.length - 5} autres éléments non affichés)
            </Typography>
          )}
        </List>
      </Paper>

      {/* Section Countries */}
      <Paper sx={{ my: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Pays
        </Typography>
        <List>
          {countries.slice(0, 5).map((country, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={JSON.stringify(country)} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {countries.length > 5 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ...({countries.length - 5} autres éléments non affichés)
            </Typography>
          )}
        </List>
      </Paper>

      {/* Section Global Data */}
      <Paper sx={{ my: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Données Globales
        </Typography>
        <List>
          {globalData.slice(0, 5).map((data, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={JSON.stringify(data)} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {globalData.length > 5 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ...({globalData.length - 5} autres éléments non affichés)
            </Typography>
          )}
        </List>
      </Paper>

      {/* Section Regions */}
      <Paper sx={{ my: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Régions
        </Typography>
        <List>
          {regions.slice(0, 5).map((region, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={JSON.stringify(region)} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {regions.length > 5 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ...({regions.length - 5} autres éléments non affichés)
            </Typography>
          )}
        </List>
      </Paper>

      {/* Section Diseases */}
      <Paper sx={{ my: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Maladies
        </Typography>
        <List>
          {diseases.slice(0, 5).map((disease, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={JSON.stringify(disease)} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          {diseases.length > 5 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ...({diseases.length - 5} autres éléments non affichés)
            </Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default Api;