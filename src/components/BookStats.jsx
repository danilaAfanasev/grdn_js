import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';

const BookStats = () => {
  const { books } = useSelector(state => state.books);

  const totalBooks = books.length;
  const readBooks = books.filter(book => book.read).length;
  const unreadBooks = totalBooks - readBooks;
  const averageRating = books.reduce((sum, book) => sum + book.rating, 0) / totalBooks;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography>Всего книг: {totalBooks}</Typography>
      <Typography>Прочитано: {readBooks}</Typography>
      <Typography>Не прочитано: {unreadBooks}</Typography>
      <Typography>Средний рейтинг: {averageRating.toFixed(2)}</Typography>
    </Box>
  );
};

export default BookStats;
