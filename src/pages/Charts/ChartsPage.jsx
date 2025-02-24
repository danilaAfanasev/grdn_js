import React, { useState, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Box, useTheme, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, DialogActions } from '@mui/material';
import StackedBarChart from './StackedBarChart'; // Импортируем новый компонент

const generateRandomData = () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 31));

const ChartsPage = () => {
  const theme = useTheme();
  const currentDayIndex = new Date().getDay() - 1;

  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

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

  const options = useMemo(() => ({
    chart: {
      backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
      style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      events: {
        click: handleCategoryClick,
      },
    },
    title: {
      text: 'Продажи по отделам',
      style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
    },
    xAxis: {
      categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      title: {
        text: 'Дни недели',
        style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      },
      plotLines: [
        {
          color: 'gray',
          width: 2,
          value: currentDayIndex,
          dashStyle: 'dash',
          label: { text: 'Сегодня', style: { color: 'gray', fontWeight: 'bold' } },
        },
      ],
      labels: {
        style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      },
      lineColor: theme.palette.mode === 'dark' ? '#555' : '#ccc',
      tickColor: theme.palette.mode === 'dark' ? '#555' : '#ccc',
    },
    yAxis: {
      title: {
        text: 'Количество продаж',
        style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      },
      gridLineColor: theme.palette.mode === 'dark' ? '#555' : '#e6e6e6',
      labels: {
        style: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
      },
    },
    series: [
      { name: 'Отдел 1', data: data.department1, color: '#1f77b4' },
      { name: 'Отдел 2', data: data.department2, color: '#ff7f0e' },
      { name: 'Отдел 3', data: data.department3, color: '#2ca02c' },
    ],
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    plotOptions: {
      series: {
        borderColor: theme.palette.mode === 'dark' ? '#555' : '#ccc',
        point: {
          events: {
            click: handleCategoryClick,
          },
        },
      },
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: { color: theme.palette.mode === 'dark' ? '#fff' : '#333' },
    },
  }), [data, theme]);

  return (
    <Box sx={{ position: 'relative', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, marginBottom: '20px' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Button
          variant="contained"
          color="primary"
          onClick={updateData}
          sx={{ display: 'block', marginTop: '20px', marginLeft: 'auto' }}
        >
          Обновить данные
        </Button>
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <StackedBarChart /> {/* Добавляем новый график */}
      </Box>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md">
        <DialogTitle>
          Данные за {daysOfWeek[selectedDayIndex]}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Отдел</TableCell>
                  <TableCell>Продажи</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Отдел 1</TableCell>
                  <TableCell>{data.department1[selectedDayIndex]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Отдел 2</TableCell>
                  <TableCell>{data.department2[selectedDayIndex]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Отдел 3</TableCell>
                  <TableCell>{data.department3[selectedDayIndex]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button
            onClick={() => setModalOpen(false)}
            color="primary"
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChartsPage;
