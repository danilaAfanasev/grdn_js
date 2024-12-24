import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/bookSlice';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Sort = () => {
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    dispatch(setSort(event.target.value));
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Сортировать по</InputLabel>
      <Select onChange={handleSortChange} displayEmpty>
        <MenuItem value="title">Названию</MenuItem>
        <MenuItem value="author">Автору</MenuItem>
        <MenuItem value="year">Году</MenuItem>
        <MenuItem value="rating">Рейтингу</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
