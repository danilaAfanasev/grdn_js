import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/bookSlice';
import { TextField, Button, Box, MenuItem, Select } from '@mui/material';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && year && genre && rating) {
      const newBook = {
        id: Date.now(),
        title,
        author,
        year,
        genre,
        rating,
        read: false,
      };
      dispatch(addBook(newBook));
      setTitle('');
      setAuthor('');
      setYear('');
      setGenre('');
      setRating(0);
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Автор"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <TextField
        label="Год"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <Select
        label="Жанр"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      >
        <MenuItem value="Фантастика">Фантастика</MenuItem>
        <MenuItem value="Детектив">Детектив</MenuItem>
        <MenuItem value="Роман">Роман</MenuItem>
        <MenuItem value="Научная фантастика">Научная фантастика</MenuItem>
        <MenuItem value="Исторический роман">Исторический роман</MenuItem>
        <MenuItem value="Фэнтези">Фэнтези</MenuItem>
        <MenuItem value="Приключения">Приключения</MenuItem>
        <MenuItem value="Триллер">Триллер</MenuItem>
        <MenuItem value="Мистика">Мистика</MenuItem>
        <MenuItem value="Хоррор">Хоррор</MenuItem>
      </Select>
      <TextField
        label="Рейтинг"
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        inputProps={{ min: 1, max: 5 }}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить книгу
      </Button>
    </Box>
  );
};

export default BookForm;
