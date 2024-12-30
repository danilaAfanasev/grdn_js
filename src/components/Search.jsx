import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/bookSlice';

const Search = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div>
      <label>Поиск по названию или автору</label>
      <input type="text" onChange={handleSearchChange} />
    </div>
  );
};

export default Search;
