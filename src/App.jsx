import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import Filter from './components/Filter';
import Sort from './components/Sort';
import Search from './components/Search';
import BookStats from './components/BookStats';
import './styles/main.scss';
import { Container, Typography, Box } from '@mui/material';

const AppContent = () => {
  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', padding: 0, backgroundColor: '#fff', color: '#333' }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ textAlign: 'center', marginTop: 2, color: '#444' }}>
        Моя библиотека
      </Typography>
      <BookForm />
      <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Filter />
        <Sort />
        <Search />
      </Box>
      <BookStats />
      <BookList />
    </Container>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
