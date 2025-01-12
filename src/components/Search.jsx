import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../redux/bookSlice';
import { TextField, Box } from '@mui/material';

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.books.search);

  const handleChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        label="Поиск по названию или автору"
        value={search}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
    </Box>
  );
};

export default Search;
