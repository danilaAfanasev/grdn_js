import React from 'react';
import { Box } from '@mui/material';
import BarChart from './BarChart/BarChart';
import StackedBarChart from './StackedBarChart/StackedBarChart';
import YearlyBarChart from './YearlyBarChart/YearlyBarChart';

const ChartsPage = () => {
  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <BarChart />
      <StackedBarChart />
      <YearlyBarChart />
    </Box>
  );
};

export default ChartsPage;
