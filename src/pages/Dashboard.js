import React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import PieChart2 from '../components/PieChart2';
import TotalDeathsChart from '../components/TotalDeathsChart';
import TotalRecoveredChart from '../components/TotalRecoveredChart';
import DailyCasesChart from '../components/DailyCasesChart';

const Dashboard = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <BarChart />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <TotalDeathsChart />
            </Paper>
          </Grid>

          {/* Groupe côte à côte pour les deux PieChart */}
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={6}>
              <Paper sx={{ p: 2 }}>
                <PieChart />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2 }}>
                <PieChart2 />
              </Paper>
            </Grid>
          </Grid>

          {/* Mettre TotalRecoveredChart et DailyCasesChart côte à côte */}
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={6}>
              <Paper sx={{ p: 2 }}>
                <TotalRecoveredChart />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2 }}>
                <DailyCasesChart />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
