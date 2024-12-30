import React from 'react';
import { useSelector } from 'react-redux';

const BookStats = () => {
  const { books } = useSelector(state => state.books);

  const totalBooks = books.length;
  const readBooks = books.filter(book => book.read).length;
  const unreadBooks = totalBooks - readBooks;
  const averageRating = books.reduce((sum, book) => sum + book.rating, 0) / totalBooks;

  return (
    <div className="book-stats">
      <p>Всего книг: {totalBooks}</p>
      <p>Прочитано: {readBooks}</p>
      <p>Не прочитано: {unreadBooks}</p>
      <p>Средний рейтинг: {averageRating.toFixed(2)}</p>
    </div>
  );
};

export default BookStats;
