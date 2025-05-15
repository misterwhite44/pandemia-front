import React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import PieChart2 from '../components/PieChart2';

const Dashboard = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <LineChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <BarChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <PieChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <PieChart2 /> {/* Nouveau camembert Monkeypox */}
            </Paper>
          </Grid>
        </Grid>
        
      </Container>
    </Box>
  );
};

export default Dashboard;
