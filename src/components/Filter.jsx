import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/bookSlice';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Фильтр по жанру</InputLabel>
      <Select onChange={handleFilterChange} displayEmpty>
        <MenuItem value="">Все жанры</MenuItem>
        <MenuItem value="Фантастика">Фантастика</MenuItem>
        <MenuItem value="Детектив">Детектив</MenuItem>
        <MenuItem value="Роман">Роман</MenuItem>
        <MenuItem value="Научная фантастика">Научная фантастика</MenuItem>
        <MenuItem value="Исторический роман">Исторический роман</MenuItem>
        <MenuItem value="Фэнтези">Фэнтези</MenuItem>
        <MenuItem value="Приключения">Приключения</MenuItem>
        <MenuItem value="Триллер">Триллер</MenuItem>
        <MenuItem value="Мистика">Мистика</MenuItem>
        <MenuItem value="Хоррор">Хоррор</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Filter;
