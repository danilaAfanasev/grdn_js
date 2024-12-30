import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBook, toggleReadStatus } from '../redux/bookSlice';
import BookItem from './BookItem';

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
      switch (sort) {
        case 'Название':
          return a.title.localeCompare(b.title);
        case 'Автор':
          return a.author.localeCompare(b.author);
        case 'Год':
          return a.year - b.year;
        case 'Рейтинг':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  return (
    <div className="book-list">
      {filteredBooks.map((book, i) => (
        <BookItem
          key={i}
          book={book}
          onRemove={() => dispatch(removeBook(book.id))}
          onToggleRead={() => dispatch(toggleReadStatus(book.id))}
        />
      ))}
    </div>
  );
};

export default BookList;
