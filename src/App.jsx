import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { store } from './redux/store';
import AppContent from './components/AppContent';
import PhotosPage from './pages/Photo/PhotosPage';
import TodosPage from './pages/Todos/TodosPage';
import TodoDetailPage from './pages/Todos/TodoDetailPage';
import PhotoDetailPage from './pages/Photo/PhotoDetailPage';
import UsersTable from './pages/UsersTable/UsersTable';
import ChartsPage from './pages/Charts/ChartsPage';
import LoginPage from './pages/Login/LoginPage';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './components/Themes';
import NavBar from './components/NavBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const getSavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? JSON.parse(savedTheme) : false;
};

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(getSavedTheme);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Box sx={{ position: 'relative' }}>
            <Router>
              <Routes>
                <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}>
                  <Route index element={<AppContent />} />
                  <Route path="photos" element={<PhotosPage />} />
                  <Route path="photos/:id" element={<PhotoDetailPage />} />
                  <Route path="todos" element={<TodosPage />} />
                  <Route path="todos/:id" element={<TodoDetailPage />} />
                  <Route path="users" element={<UsersTable />} />
                  <Route path="charts" element={<ChartsPage />} />
                </Route>
              </Routes>
            </Router>
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const Layout = ({ isDarkMode, toggleTheme }) => {
  const authed = useSelector((state) => state.auth.authed);

  return authed ? (
    <>
      <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Outlet />
    </>
  ) : (
    <LoginPage />
  );
};

export default App;