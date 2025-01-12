import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/bookSlice';
import { TextField, MenuItem, Box } from '@mui/material';

const genreOptions = [
  'Фантастика', 'Детектив', 'Роман', 'Научная фантастика', 'Исторический роман',
  'Фэнтези', 'Приключения', 'Триллер', 'Мистика', 'Хоррор'
];

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.books.filter);

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <TextField
        select
        label="Фильтр по жанру"
        value={filter}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      >
        <MenuItem value="">Все жанры</MenuItem>
        {genreOptions.map((genre, i) => (
          <MenuItem key={i} value={genre}>{genre}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default Filter;
