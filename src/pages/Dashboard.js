import React from 'react';
import { Box, Container, Grid, Paper, useTheme } from '@mui/material';
import BarChart from '../components/BarChart';
import TotalDeathsChart from '../components/TotalDeathsChart';
import PieChart from '../components/PieChart';
import PieChart2 from '../components/PieChart2';
import TotalRecoveredChart from '../components/TotalRecoveredChart';
import DailyCasesChart from '../components/DailyCasesChart';
// ...import de tes charts

const Dashboard = () => {
  const theme = useTheme();

  const charts = [
    { component: <BarChart /> },
    { component: <TotalDeathsChart /> },
    { component: <PieChart /> },
    { component: <PieChart2 /> },
    { component: <TotalRecoveredChart /> },
    { component: <DailyCasesChart /> },
  ];

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        py: { xs: 3, sm: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
          {charts.map((chart, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={index > 1 ? 6 : 12}
              md={index > 1 ? 4 : 6}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 400,
                    position: 'relative',
                    '& canvas': {
                      height: '100% !important',
                      width: '100% !important',
                    },
                  }}
                >
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
