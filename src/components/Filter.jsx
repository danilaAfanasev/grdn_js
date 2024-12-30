import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/bookSlice';

const genreOptions = [
  'Фантастика', 'Детектив', 'Роман', 'Научная фантастика', 'Исторический роман',
  'Фэнтези', 'Приключения', 'Триллер', 'Мистика', 'Хоррор'
];

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label>Фильтр по жанру</label>
      <select onChange={handleFilterChange} style={{ minWidth: '120px' }}>
        <option value="">Все жанры</option>
        {genreOptions.map((genre, i) => (
          <option key={i} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
