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

  const options = {
    chart: {
      type: 'column',
      backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
      style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      animation: {
        duration: 1000,
      },
    },
    title: {
      text: 'Продажи по категориям за кварталы',
      style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
    },
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      title: {
        text: 'Кварталы',
        style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      },
      labels: {
        style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      },
      lineColor: theme.palette.mode === 'dark' ? '#555' : '#ccc',
      tickColor: theme.palette.mode === 'dark' ? '#555' : '#ccc',
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Сумма продаж',
        style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      },
      gridLineColor: theme.palette.mode === 'dark' ? '#555' : '#e6e6e6',
      labels: {
        style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: theme.palette.mode === 'dark' ? '#fff' : 'gray',
        },
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: 'Категория A',
        data: [120, 150, 130, 160],
      },
      {
        name: 'Категория B',
        data: [80, 90, 70, 100],
      },
      {
        name: 'Категория C',
        data: [50, 60, 55, 70],
      },
      {
        name: 'Категория D',
        data: [70, 90, 45, 105],
      },
    ],
  };

  return loading ? <div>Загрузка...</div> : <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StackedBarChart;
