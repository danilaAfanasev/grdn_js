import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBook, toggleReadStatus, toggleAllReadStatus } from '../redux/bookSlice';
import BookItem from './BookItem';
import { Box, FormControlLabel, Checkbox } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';

const BookList = ({ onBookRemoved, openModal }) => {
  const { books, filter, sort, search } = useSelector(state => state.books);
  const dispatch = useDispatch();
  const [isToggleAllReadDialogOpen, setIsToggleAllReadDialogOpen] = useState(false);
  const [isRemoveBookDialogOpen, setIsRemoveBookDialogOpen] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [bookToRemove, setBookToRemove] = useState(null);

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
    setAllRead(!filteredBooks.every(book => book.read));
    setIsToggleAllReadDialogOpen(true);
  };

  const handleConfirmToggleAllRead = () => {
    dispatch(toggleAllReadStatus(allRead));
    setCheckboxChecked(allRead);
    setIsToggleAllReadDialogOpen(false);
  };

  const handleCloseToggleAllReadDialog = () => {
    setIsToggleAllReadDialogOpen(false);
  };

  const openConfirmationDialog = (bookId) => {
    setBookToRemove(bookId);
    setIsRemoveBookDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    dispatch(removeBook(bookToRemove));
    onBookRemoved();
    setIsRemoveBookDialogOpen(false);
  };

  const handleCloseRemoveBookDialog = () => {
    setIsRemoveBookDialogOpen(false);
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkboxChecked}
            onChange={handleToggleAllRead}
          />
        }
        label="Выделить все книги"
      />
      {filteredBooks.map((book, i) => (
        <BookItem
          key={i}
          book={book}
          onRemove={() => openConfirmationDialog(book.id)}
          onToggleRead={() => dispatch(toggleReadStatus(book.id))}
          onEdit={openModal}
        />
      ))}
      <ConfirmationDialog
        open={isToggleAllReadDialogOpen}
        onClose={handleCloseToggleAllReadDialog}
        onConfirm={handleConfirmToggleAllRead}
        message={`Вы уверены, что хотите отметить все книги как ${allRead ? 'прочитанные' : 'непрочитанные'}?`}
      />
      <ConfirmationDialog
        open={isRemoveBookDialogOpen}
        onClose={handleCloseRemoveBookDialog}
        onConfirm={handleConfirmRemove}
        message="Вы уверены, что хотите удалить эту книгу из библиотеки?"
      />
    </Box>
  );
};

export default BookList;
