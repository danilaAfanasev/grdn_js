import { createSlice } from '@reduxjs/toolkit';

const initialBooks = [
  { id: 1, title: '1984', author: 'Джордж Оруэлл', year: 1949, genre: 'Детектив', rating: 4, read: false },
  { id: 2, title: 'Властелин колец', author: 'Дж. Р. Р. Толкин', year: 1954, genre: 'Фэнтези', rating: 5, read: true },
  { id: 3, title: 'Гарри Поттер и философский камень', author: 'Дж. К. Роулинг', year: 1997, genre: 'Фэнтези', rating: 5, read: true },
  { id: 4, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', year: 1966, genre: 'Роман', rating: 4, read: false },
  { id: 5, title: 'Три мушкетера', author: 'Александр Дюма', year: 1844, genre: 'Исторический роман', rating: 3, read: false },
  { id: 6, title: 'Дюна', author: 'Фрэнк Герберт', year: 1965, genre: 'Научная фантастика', rating: 5, read: true },
  { id: 7, title: 'Игра престолов', author: 'Джордж Р. Р. Мартин', year: 1996, genre: 'Фэнтези', rating: 5, read: false },
  { id: 8, title: 'Убить пересмешника', author: 'Харпер Ли', year: 1960, genre: 'Роман', rating: 4, read: true },
  { id: 9, title: 'Граф Монте-Кристо', author: 'Александр Дюма', year: 1844, genre: 'Исторический роман', rating: 4, read: false },
  { id: 10, title: 'Фонтан', author: 'Айн Рэнд', year: 1943, genre: 'Роман', rating: 4, read: true },
  { id: 11, title: 'Шерлок Холмс', author: 'Артур Конан Дойл', year: 1887, genre: 'Детектив', rating: 4, read: true },
  { id: 12, title: 'Франкенштейн', author: 'Мэри Шелли', year: 1818, genre: 'Хоррор', rating: 4, read: false },
  { id: 13, title: 'Дракула', author: 'Брэм Стокер', year: 1897, genre: 'Хоррор', rating: 4, read: true },
  { id: 14, title: '2001: Космическая одиссея', author: 'Артур Кларк', year: 1968, genre: 'Научная фантастика', rating: 4, read: false },
  { id: 15, title: 'Мир дикого запада', author: 'Майкл Крайтон', year: 1973, genre: 'Научная фантастика', rating: 4, read: true },
  { id: 16, title: 'Приключения Тома Сойера', author: 'Марк Твен', year: 1876, genre: 'Приключения', rating: 4, read: false },
  { id: 17, title: 'Остров сокровищ', author: 'Роберт Льюис Стивенсон', year: 1883, genre: 'Приключения', rating: 4, read: true },
  { id: 18, title: 'Психо', author: 'Роберт Блох', year: 1959, genre: 'Триллер', rating: 4, read: false },
  { id: 19, title: 'Сияние', author: 'Стивен Кинг', year: 1977, genre: 'Хоррор', rating: 4, read: true },
  { id: 20, title: 'Мистика', author: 'Дэн Браун', year: 2000, genre: 'Мистика', rating: 4, read: false },
];

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: initialBooks,
    filter: '',
    sort: '',
    search: '',
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    toggleReadStatus: (state, action) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book) {
        book.read = !book.read;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setRating: (state, action) => {
      const book = state.books.find(book => book.id === action.payload.id);
      if (book) {
        book.rating = action.payload.rating;
      }
    },
  },
});

export const { addBook, removeBook, toggleReadStatus, setFilter, setSort, setSearch, setRating } = bookSlice.actions;
export default bookSlice.reducer;
