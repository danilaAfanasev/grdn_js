import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBook, toggleReadStatus, toggleAllReadStatus } from '../redux/bookSlice';
import BookItem from './BookItem';
import { Box, FormControlLabel, Checkbox } from '@mui/material';

const BookList = ({ onBookRemoved }) => {
  const { books, filter, sort, search } = useSelector(state => state.books);
  const dispatch = useDispatch();

  let filteredBooks = books;

  if (filter) {
    filteredBooks = filteredBooks.filter(book => book.genre === filter);
  }

  if (search) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort) {
    filteredBooks = [...filteredBooks].sort((a, b) => {
      switch (sort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year':
          return a.year - b.year;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  const handleToggleAllRead = () => {
    const allRead = filteredBooks.every(book => book.read);
    dispatch(toggleAllReadStatus(!allRead));
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox onChange={handleToggleAllRead} />}
        label="Выделить все книги"
      />
      {filteredBooks.map((book, i) => (
        <BookItem
          key={i}
          book={{ ...book, description: 'Краткое содержание книги ' + book.title }}
          onRemove={() => {
            dispatch(removeBook(book.id));
            onBookRemoved();
          }}
          onToggleRead={() => dispatch(toggleReadStatus(book.id))}
        />
      ))}
    </Box>
  );
};

export default BookList;
