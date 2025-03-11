import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '@mui/material';

const StackedBarChart = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getThemeColors = () => ({
    background: theme.palette.mode === 'dark' ? '#333' : '#fff',
    text: theme.palette.mode === 'dark' ? '#fff' : '#333',
    gridLine: theme.palette.mode === 'dark' ? '#555' : '#e6e6e6',
    axisLine: theme.palette.mode === 'dark' ? '#555' : '#ccc',
  });

  const themeColors = getThemeColors();

  const options = {
    chart: {
      type: 'column',
      backgroundColor: themeColors.background,
      style: { color: themeColors.text },
      animation: {
        duration: 1000,
      },
    },
    title: {
      text: 'Продажи по категориям за кварталы',
      style: { color: themeColors.text },
    },
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      title: {
        text: 'Кварталы',
        style: { color: themeColors.text },
      },
      labels: {
        style: { color: themeColors.text },
      },
      lineColor: themeColors.axisLine,
      tickColor: themeColors.axisLine,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Сумма продаж',
        style: { color: themeColors.text },
      },
      gridLineColor: themeColors.gridLine,
      labels: {
        style: { color: themeColors.text },
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: themeColors.text === '#fff' ? '#fff' : 'white',
        },
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: { color: themeColors.text },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: { enabled: false },
        borderWidth: 0,
      },
    },
    series: [
      { name: 'Категория A', data: [120, 150, 130, 160] },
      { name: 'Категория B', data: [80, 90, 70, 100] },
      { name: 'Категория C', data: [50, 60, 55, 70] },
      { name: 'Категория D', data: [70, 90, 45, 105] },
    ],
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
  };

  return loading ? <div>Загрузка...</div> : <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StackedBarChart;