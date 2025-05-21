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
          <Grid
            item
            xs={12}
            md={6}
            sx={{ mb: { xs: 3, md: 0 } }}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                height: { xs: 300, md: 350 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4, // arrondi des bords
              }}
            >
              <BarChart />
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ mb: { xs: 3, md: 0 } }}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                height: { xs: 300, md: 350 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
              }}
            >
              <TotalDeathsChart />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 3, sm: 0 } }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                height: { xs: 250, sm: 280, md: 300 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
              }}
            >
              <PieChart />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 3, sm: 0 } }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                height: { xs: 250, sm: 280, md: 300 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
              }}
            >
              <PieChart2 />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 3, sm: 0 } }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                height: { xs: 250, sm: 280, md: 300 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
              }}
            >
              <TotalRecoveredChart />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 3, sm: 0 } }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                height: { xs: 250, sm: 280, md: 300 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
              }}
            >
              <DailyCasesChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
