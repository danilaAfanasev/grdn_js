import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/bookSlice';
import Rating from '@mui/material/Rating';

const genreOptions = [
  'Фантастика', 'Детектив', 'Роман', 'Научная фантастика', 'Исторический роман',
  'Фэнтези', 'Приключения', 'Триллер', 'Мистика', 'Хоррор'
];

const BookForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
    rating: 0,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.author && formData.year && formData.genre && formData.rating) {
      const newBook = {
        id: Date.now(),
        ...formData,
        read: false,
      };
      dispatch(addBook(newBook));
      setFormData({
        title: '',
        author: '',
        year: '',
        genre: '',
        rating: 0,
      });
      onClose();
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div>
        <label>Название</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Автор</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
      </div>
      <div>
        <label>Год</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} required />
      </div>
      <div>
        <label>Жанр</label>
        <select name="genre" value={formData.genre} onChange={handleChange} required>
          <option value="">Выберите жанр</option>
          {genreOptions.map((genre, i) => (
            <option key={i} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div className="rating-label">
        <label>Рейтинг</label>
        <Rating
          name="simple-controlled"
          value={formData.rating}
          onChange={handleRatingChange}
        />
      </div>
      <button type="submit">Добавить книгу</button>
    </form>
  );
};

export default BookForm;
