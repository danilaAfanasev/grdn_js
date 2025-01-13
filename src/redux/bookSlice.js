import { createSlice } from '@reduxjs/toolkit';

const initialBooks = [
  { id: 1, title: '1984', author: 'Джордж Оруэлл', year: 1949, genre: 'Детектив', rating: 4, read: false, description: 'Краткое содержание книги 1984' },
  { id: 2, title: 'Властелин колец', author: 'Дж. Р. Р. Толкин', year: 1954, genre: 'Фэнтези', rating: 5, read: true, description: 'Краткое содержание книги Властелин колец' },
  { id: 3, title: 'Гарри Поттер и философский камень', author: 'Дж. К. Роулинг', year: 1997, genre: 'Фэнтези', rating: 5, read: true, description: 'Краткое содержание книги Гарри Поттер и философский камень' },
  { id: 4, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', year: 1966, genre: 'Роман', rating: 4, read: false, description: 'Краткое содержание книги Мастер и Маргарита' },
  { id: 5, title: 'Три мушкетера', author: 'Александр Дюма', year: 1844, genre: 'Исторический роман', rating: 3, read: false, description: 'Краткое содержание книги Три мушкетера' },
  { id: 6, title: 'Дюна', author: 'Фрэнк Герберт', year: 1965, genre: 'Научная фантастика', rating: 5, read: true, description: 'Краткое содержание книги Дюна' },
  { id: 7, title: 'Игра престолов', author: 'Джордж Р. Р. Мартин', year: 1996, genre: 'Фэнтези', rating: 5, read: false, description: 'Краткое содержание книги Игра престолов' },
  { id: 8, title: 'Убить пересмешника', author: 'Харпер Ли', year: 1960, genre: 'Роман', rating: 4, read: true, description: 'Краткое содержание книги Убить пересмешника' },
  { id: 9, title: 'Граф Монте-Кристо', author: 'Александр Дюма', year: 1844, genre: 'Исторический роман', rating: 4, read: false, description: 'Краткое содержание книги Граф Монте-Кристо' },
  { id: 10, title: 'Фонтан', author: 'Айн Рэнд', year: 1943, genre: 'Роман', rating: 4, read: true, description: 'Краткое содержание книги Фонтан' },
  { id: 11, title: 'Шерлок Холмс', author: 'Артур Конан Дойл', year: 1887, genre: 'Детектив', rating: 4, read: true, description: 'Краткое содержание книги Шерлок Холмс' },
  { id: 12, title: 'Франкенштейн', author: 'Мэри Шелли', year: 1818, genre: 'Хоррор', rating: 4, read: false, description: 'Краткое содержание книги Франкенштейн' },
  { id: 13, title: 'Дракула', author: 'Брэм Стокер', year: 1897, genre: 'Хоррор', rating: 4, read: true, description: 'Краткое содержание книги Дракула' },
  { id: 14, title: '2001: Космическая одиссея', author: 'Артур Кларк', year: 1968, genre: 'Научная фантастика', rating: 4, read: false, description: 'Краткое содержание книги 2001: Космическая одиссея' },
  { id: 15, title: 'Мир дикого запада', author: 'Майкл Крайтон', year: 1973, genre: 'Научная фантастика', rating: 4, read: true, description: 'Краткое содержание книги Мир дикого запада' },
  { id: 16, title: 'Приключения Тома Сойера', author: 'Марк Твен', year: 1876, genre: 'Приключения', rating: 4, read: false, description: 'Краткое содержание книги Приключения Тома Сойера' },
  { id: 17, title: 'Остров сокровищ', author: 'Роберт Льюис Стивенсон', year: 1883, genre: 'Приключения', rating: 4, read: true, description: 'Краткое содержание книги Остров сокровищ' },
  { id: 18, title: 'Психо', author: 'Роберт Блох', year: 1959, genre: 'Триллер', rating: 4, read: false, description: 'Краткое содержание книги Психо' },
  { id: 19, title: 'Сияние', author: 'Стивен Кинг', year: 1977, genre: 'Хоррор', rating: 4, read: true, description: 'Краткое содержание книги Сияние' },
  { id: 20, title: 'Мистика', author: 'Дэн Браун', year: 2000, genre: 'Мистика', rating: 4, read: false, description: 'Краткое содержание книги Мистика' },
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
    toggleAllReadStatus: (state, action) => {
      state.books.forEach(book => {
        book.read = action.payload;
      });
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
    editBook: (state, action) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
  },
});

export const { addBook, removeBook, toggleReadStatus, toggleAllReadStatus, setFilter, setSort, setSearch, setRating, editBook } = bookSlice.actions;
export default bookSlice.reducer;
