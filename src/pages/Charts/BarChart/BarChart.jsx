import React, { useState, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Box, useTheme } from '@mui/material';
import ModalWindow from './ModalWindow';

const generateRandomData = () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 31));

const BarChart = () => {
  const theme = useTheme();
  const currentDayIndex = (new Date().getDay() + 6) % 7;
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const [data, setData] = useState({
    department1: generateRandomData(),
    department2: generateRandomData(),
    department3: generateRandomData(),
  });
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const updateData = () => {
    setData({
      department1: generateRandomData(),
      department2: generateRandomData(),
      department3: generateRandomData(),
    });
  };

  const handleCategoryClick = (event) => {
    if (event.point) {
      setSelectedDayIndex(event.point.x);
      setModalOpen(true);
    }
  };

  const getThemeColors = () => ({
    background: theme.palette.mode === 'dark' ? '#333' : '#fff',
    text: theme.palette.mode === 'dark' ? '#fff' : '#333',
    gridLine: theme.palette.mode === 'dark' ? '#555' : '#e6e6e6',
    axisLine: theme.palette.mode === 'dark' ? '#aaa' : '#333',
  });

  const themeColors = getThemeColors();

  const options = useMemo(() => ({
    chart: {
      backgroundColor: themeColors.background,
      style: { color: themeColors.text },
      events: { click: handleCategoryClick },
    },
    title: {
      text: 'Продажи по отделам',
      style: { color: themeColors.text },
    },
    xAxis: {
      categories: daysOfWeek,
      title: { text: 'Дни недели', style: { color: themeColors.text } },
      labels: { style: { color: themeColors.text } },
      lineColor: themeColors.axisLine,
      tickColor: themeColors.axisLine,
      plotLines: [
        {
          color: 'gray',
          width: 2,
          value: currentDayIndex,
          dashStyle: 'dash',
          label: { text: 'Сегодня', style: { color: 'gray', fontWeight: 'bold' } },
        },
      ],
    },
    yAxis: {
      title: { text: 'Количество продаж', style: { color: themeColors.text } },
      labels: { style: { color: themeColors.text } },
      gridLineColor: themeColors.gridLine,
    },
    series: [
      { name: 'Отдел 1', data: data.department1, color: '#1f77b4' },
      { name: 'Отдел 2', data: data.department2, color: '#ff7f0e' },
      { name: 'Отдел 3', data: data.department3, color: '#2ca02c' },
    ],
    tooltip: { shared: true, crosshairs: true },
    plotOptions: {
      series: {
        borderWidth: 0,
        point: { events: { click: handleCategoryClick } },
      },
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: { color: themeColors.text },
    },
    accessibility: {
      enabled: false,
    },
  }), [data, themeColors]);

  return (
    <>
      <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={updateData}
          sx={{ minWidth: '150px' }}
        >
          Обновить данные
        </Button>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <ModalWindow
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data}
        selectedDayIndex={selectedDayIndex}
      />
    </>
  );
};

export default BarChart;