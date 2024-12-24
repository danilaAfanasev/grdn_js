import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Rating } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setRating } from '../redux/bookSlice';

const BookItem = ({ book, onRemove, onToggleRead }) => {
  const dispatch = useDispatch();

  const handleRatingChange = (event, newValue) => {
    dispatch(setRating({ id: book.id, rating: newValue }));
  };

  return (
    <ListItem>
      <ListItemText
        primary={book.title}
        secondary={`${book.author} - ${book.year} - ${book.genre}`}
      />
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          onChange={onToggleRead}
          checked={book.read}
        />
        <Rating
          name="simple-controlled"
          value={book.rating}
          onChange={handleRatingChange}
        />
        <IconButton edge="end" aria-label="delete" onClick={onRemove}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BookItem;
