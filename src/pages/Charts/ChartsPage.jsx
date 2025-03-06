import React from 'react';
import { Box } from '@mui/material';
import BarChart from './BarChart/BarChart';
import StackedBarChart from './StackedBarChart/StackedBarChart';
import YearlyBarChart from './YearlyBarChart/YearlyBarChart';

const ChartsPage = () => {
  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '400px', mx: 'auto' }}>
        <BarChart />
      </Box>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '400px', mx: 'auto' }}>
        <StackedBarChart />
      </Box>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '400px', mx: 'auto' }}>
        <YearlyBarChart />
      </Box>
    </Box>
  );
};

export default ChartsPage;