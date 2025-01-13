// src/components/BookForm.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, editBook } from '../redux/bookSlice';
import { Controller } from 'react-hook-form';
import { TextField, MenuItem, Rating, Box, Typography, FormControl, FormLabel } from '@mui/material';
import useBookForm from '../hooks/useBookForm';

const genreOptions = [
  'Фантастика', 'Детектив', 'Роман', 'Научная фантастика', 'Исторический роман',
  'Фэнтези', 'Приключения', 'Триллер', 'Мистика', 'Хоррор'
];

const BookForm = ({ onClose, bookToEdit }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control, errors, setValue } = useBookForm(
    {
      title: '',
      author: '',
      year: '',
      genre: '',
      rating: 0,
      description: '',
    },
    (data) => {
      const newBook = {
        id: bookToEdit ? bookToEdit.id : Date.now(),
        ...data,
        read: bookToEdit ? bookToEdit.read : false,
      };
      if (bookToEdit) {
        dispatch(editBook(newBook));
      } else {
        dispatch(addBook(newBook));
      }
      onClose();
    }
  );

  useEffect(() => {
    if (bookToEdit) {
      setValue('title', bookToEdit.title);
      setValue('author', bookToEdit.author);
      setValue('year', bookToEdit.year);
      setValue('genre', bookToEdit.genre);
      setValue('rating', bookToEdit.rating);
      setValue('description', bookToEdit.description);
    }
  }, [bookToEdit, setValue]);

  return (
    <form id="book-form" onSubmit={handleSubmit}>
      <TextField
        {...register('title')}
        label="Название"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        {...register('author')}
        label="Автор"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.author}
        helperText={errors.author?.message}
      />
      <TextField
        {...register('year')}
        label="Год"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.year}
        helperText={errors.year?.message}
        inputMode="numeric"
        pattern="[0-9]{4}"
      />
      <Controller
        name="genre"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Жанр"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.genre}
            helperText={errors.genre?.message}
          >
            {genreOptions.map((genre, i) => (
              <MenuItem key={i} value={genre}>{genre}</MenuItem>
            ))}
          </TextField>
        )}
      />
      <TextField
        {...register('description')}
        label="Краткое содержание"
        variant="outlined"
        margin="normal"
        fullWidth
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <FormControl component="fieldset" margin="normal" fullWidth>
        <FormLabel component="legend">Рейтинг</FormLabel>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Rating
              {...field}
              onChange={(event, newValue) => field.onChange(newValue)}
            />
          )}
        />
      </FormControl>
      {errors.rating && <Typography color="error">{errors.rating.message}</Typography>}
    </form>
  );
};

export default BookForm;
