import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/bookSlice';
import { TextField, FormControl } from '@mui/material';

const Search = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <TextField
        label="Поиск по названию или автору"
        onChange={handleSearchChange}
      />
    </FormControl>
  );
};

export default Search;
