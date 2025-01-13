// src/validation/bookSchema.js
import * as yup from 'yup';

const bookSchema = yup.object().shape({
  title: yup.string().required('Название обязательно').min(1, 'Название должно быть длиной от 1 до 100 символов').max(100, 'Название должно быть длиной от 1 до 100 символов'),
  author: yup.string().required('Автор обязателен').min(1, 'Автор должен быть длиной от 1 до 100 символов').max(100, 'Автор должен быть длиной от 1 до 100 символов'),
  year: yup.number().required('Год обязателен').min(0, 'Год должен быть положительным числом').max(new Date().getFullYear(), 'Год не может быть в будущем'),
  genre: yup.string().required('Жанр обязателен'),
  rating: yup.number().required('Рейтинг обязателен').min(0, 'Рейтинг должен быть от 0 до 5').max(5, 'Рейтинг должен быть от 0 до 5'),
  description: yup.string().required('Краткое содержание обязательно').min(10, 'Краткое содержание должно быть длиной от 10 до 500 символов').max(500, 'Краткое содержание должно быть длиной от 10 до 500 символов'),
});

export default bookSchema;
