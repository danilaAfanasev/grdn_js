import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Box, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://backend.s3grdn.ru/api/test/barchart';

const fetchChartData = async (year) => {
  const response = await axios.get(`${API_URL}/${year}`);
  return response.data.map((item) => ({
    name: item.Name,
    data: item.Data.map((value) => parseFloat(value.replace(',', '.'))),
  }));
};

const YearlyBarChart = () => {
  const theme = useTheme();
  const [year, setYear] = useState(2024);

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ['chartData', year],
    queryFn: () => fetchChartData(year),
  });

  const currentMonthIndex = new Date().getMonth();

  const getThemeColors = () => ({
    background: theme.palette.mode === 'dark' ? '#333' : '#fff',
    text: theme.palette.mode === 'dark' ? '#fff' : '#333',
    gridLine: theme.palette.mode === 'dark' ? '#555' : '#ccc',
    axisLine: theme.palette.mode === 'dark' ? '#fff' : '#333',
  });

  const themeColors = getThemeColors();

  const options = {
    chart: {
      type: 'column',
      backgroundColor: themeColors.background,
    },
    title: {
      text: `Показатели за ${year} год`,
      style: { color: themeColors.text },
    },
    xAxis: {
      categories: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
      ],
      title: { text: 'Месяцы', style: { color: themeColors.text } },
      plotLines: [
        {
          color: 'gray',
          width: 2,
          value: currentMonthIndex,
          dashStyle: 'dash',
          label: { text: 'Сегодня', style: { color: 'gray', fontWeight: 'bold' } },
        },
      ],
      gridLineColor: themeColors.gridLine,
      lineColor: themeColors.axisLine,
      labels: { style: { color: themeColors.text } },
    },
    yAxis: {
      title: { text: 'Сумма (млн)', style: { color: themeColors.text } },
      labels: {
        style: { color: themeColors.text },
        formatter: function () {
          return this.value + ' млн';
        },
      },
      gridLineColor: themeColors.gridLine,
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: { color: themeColors.text },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} млн</b>',
      valueSuffix: ' млн',
    },
    plotOptions: {
      column: {
        dataLabels: { enabled: false },
        borderWidth: 0,
      },
    },
    series: chartData.map((item, index) => ({
      name: item.name,
      data: item.data,
      color: ['#2ca02c', '#1f77b4', '#ff7f0e', '#d62728'][index],
    })),
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
  };

  return (
    <>
      <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setYear((prev) => (prev === 2024 ? 2023 : 2024))}
          sx={{ minWidth: '150px' }}
        >
          Показать {year === 2024 ? '2023' : '2024'} год
        </Button>
      </Box>
      {isLoading ? <div>Загрузка...</div> : <HighchartsReact highcharts={Highcharts} options={options} />}
    </>
  );
};

export default YearlyBarChart;