import React from 'react';
import { useDispatch } from 'react-redux';
import { setRating } from '../redux/bookSlice';
import Rating from '@mui/material/Rating';

const BookItem = ({ book, onRemove, onToggleRead }) => {
  const dispatch = useDispatch();

  const handleRatingChange = (event, newValue) => {
    dispatch(setRating({ id: book.id, rating: newValue }));
  };

  return (
    <div className="book-item">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author} - {book.year} - {book.genre}</p>
      </div>
      <div className="book-actions">
        <input type="checkbox" checked={book.read} onChange={onToggleRead} />
        <Rating
          name="simple-controlled"
          value={book.rating}
          onChange={handleRatingChange}
        />
        <button onClick={onRemove}>Удалить</button>
      </div>
    </div>
  );
};

export default BookItem;
