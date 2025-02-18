import React, { useState, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Box, useTheme, FormControlLabel, Checkbox, FormGroup, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, DialogActions } from '@mui/material';

const ChartsPage = () => {
  const theme = useTheme();
  const currentDayIndex = new Date().getDay() - 1;
  
  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [data, setData] = useState({
    department1: [10, 15, 12, 8, 20, 25, 18],
    department2: [5, 12, 18, 25, 15, 10, 20],
    department3: [20, 25, 18, 12, 8, 15, 10],
  });

  const [visibleSeries, setVisibleSeries] = useState({
    department1: true,
    department2: true,
    department3: true,
  });

  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const updateData = () => {
    const newData = {
      department1: Array.from({ length: 7 }, () => Math.floor(Math.random() * 31)),
      department2: Array.from({ length: 7 }, () => Math.floor(Math.random() * 31)),
      department3: Array.from({ length: 7 }, () => Math.floor(Math.random() * 31)),
    };
    setData(newData);
  };

  const toggleSeriesVisibility = (department) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
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
      { name: 'Отдел 1', data: data.department1, color: '#1f77b4', visible: visibleSeries.department1 },
      { name: 'Отдел 2', data: data.department2, color: '#ff7f0e', visible: visibleSeries.department2 },
      { name: 'Отдел 3', data: data.department3, color: '#2ca02c', visible: visibleSeries.department3 },
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
  }), [data, visibleSeries, theme]);

  return (
    <Box sx={{ position: 'relative', padding: '20px', display: 'flex' }}>
      <Box sx={{ flex: 1 }}>
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

      <Box sx={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={visibleSeries.department1} onChange={() => toggleSeriesVisibility('department1')} />}
            label="Отдел 1"
          />
          <FormControlLabel
            control={<Checkbox checked={visibleSeries.department2} onChange={() => toggleSeriesVisibility('department2')} />}
            label="Отдел 2"
          />
          <FormControlLabel
            control={<Checkbox checked={visibleSeries.department3} onChange={() => toggleSeriesVisibility('department3')} />}
            label="Отдел 3"
          />
        </FormGroup>
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
