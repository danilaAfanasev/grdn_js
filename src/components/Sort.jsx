import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/bookSlice';

const sortOptions = ['Название', 'Автор', 'Год', 'Рейтинг'];

const Sort = () => {
  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div>
      <label>Сортировать по</label>
      <select onChange={handleSortChange} style={{ minWidth: '120px' }}>
        {sortOptions.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
