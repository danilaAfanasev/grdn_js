import React from 'react';
import { Box } from '@mui/material';
import BarChart from './BarChart/BarChart';
import StackedBarChart from './StackedBarChart/StackedBarChart';
import YearlyBarChart from './YearlyBarChart/YearlyBarChart';
import './ChartsPage.css';

const ChartsPage = () => {
  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box className="chart-container">
        <BarChart />
      </Box>
      <Box className="chart-container">
        <StackedBarChart />
      </Box>
      <Box className="chart-container">
        <YearlyBarChart />
      </Box>
    </Box>
  );
};

export default ChartsPage;