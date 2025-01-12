import React from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/bookSlice';
import { useForm, Controller } from 'react-hook-form';
import { TextField, MenuItem, Button, Rating, Box, Typography, FormControl, FormLabel } from '@mui/material';

const genreOptions = [
  'Фантастика', 'Детектив', 'Роман', 'Научная фантастика', 'Исторический роман',
  'Фэнтези', 'Приключения', 'Триллер', 'Мистика', 'Хоррор'
];

const BookForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      author: '',
      year: '',
      genre: '',
      rating: 0,
    },
  });

  const onSubmit = (data) => {
    const newBook = {
      id: Date.now(),
      ...data,
      read: false,
    };
    dispatch(addBook(newBook));
    onClose();
  };

  return (
    <form id="book-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('title', { required: 'Название обязательно' })}
        label="Название"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        {...register('author', { required: 'Автор обязателен' })}
        label="Автор"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.author}
        helperText={errors.author?.message}
      />
      <TextField
        {...register('year', {
          required: 'Год обязателен',
          min: { value: 0, message: 'Год должен быть положительным числом' },
        })}
        label="Год"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.year}
        helperText={errors.year?.message}
      />
      <TextField
        {...register('genre', { required: 'Жанр обязателен' })}
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
      <FormControl component="fieldset" margin="normal" fullWidth>
        <FormLabel component="legend">Рейтинг</FormLabel>
        <Controller
          name="rating"
          control={control}
          rules={{ required: 'Рейтинг обязателен', min: 1, max: 5 }}
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
