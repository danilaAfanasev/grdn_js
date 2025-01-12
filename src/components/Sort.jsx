import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/bookSlice';
import { TextField, MenuItem, Box } from '@mui/material';

const sortOptions = [
  { value: 'title', label: 'По названию' },
  { value: 'author', label: 'По автору' },
  { value: 'year', label: 'По году' },
  { value: 'rating', label: 'По рейтингу' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.books.sort);

  const handleChange = (event) => {
    dispatch(setSort(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <TextField
        select
        label="Сортировка"
        value={sort}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      >
        <MenuItem value="">Без сортировки</MenuItem>
        {sortOptions.map((option, i) => (
          <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Sort;
