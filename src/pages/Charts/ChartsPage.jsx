import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Box } from '@mui/material';

const ChartsPage = () => {
  const [data, setData] = useState([10, 15, 12, 8, 20, 25, 18]);

  const updateData = () => {
    const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 31));
    setData(newData);
  };

  const options = {
    title: {
      text: 'Продажи за неделю'
    },
    xAxis: {
      categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      title: {
        text: 'Дни недели'
      }
    },
    yAxis: {
      title: {
        text: 'Количество продаж'
      }
    },
    series: [{
      name: 'Продажи',
      data: data
    }]
  };

  return (
    <Box sx={{ position: 'relative', padding: '20px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Button
        variant="contained"
        color="primary"
        onClick={updateData}
        sx={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          marginTop: '20px'
        }}
      >
        Обновить данные
      </Button>
    </Box>
  );
};

export default ChartsPage;
