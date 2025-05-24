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
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        py: { xs: 3, sm: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
          {[ 
            { component: <BarChart /> },
            { component: <TotalDeathsChart /> },
            { component: <PieChart /> },
            { component: <PieChart2 /> },
            { component: <TotalRecoveredChart /> },
            { component: <DailyCasesChart /> },
          ].map((chart, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={index > 1 ? 6 : 12}
              md={index > 1 ? 3 : 6}
              sx={{ mb: { xs: 3, sm: 0 } }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  height: { xs: 280, sm: 320, md: 350 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ width: '100%', height: '100%' }}>
                  {chart.component}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
