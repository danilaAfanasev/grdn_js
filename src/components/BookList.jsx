import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBook, toggleReadStatus } from '../redux/bookSlice';
import BookItem from './BookItem';
import { List } from '@mui/material';

const BookList = () => {
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
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'author') return a.author.localeCompare(b.author);
      if (sort === 'year') return a.year - b.year;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });
  }

  return (
    <List>
      {filteredBooks.map(book => (
        <BookItem
          key={book.id}
          book={book}
          onRemove={() => dispatch(removeBook(book.id))}
          onToggleRead={() => dispatch(toggleReadStatus(book.id))}
        />
      ))}
    </List>
  );
};

export default BookList;
