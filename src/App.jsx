import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { store } from './redux/store';
import AppContent from './components/AppContent';
import PhotosPage from './pages/Photo/PhotosPage';
import TodosPage from './pages/Todos/TodosPage';
import TodoDetailPage from './pages/Todos/TodoDetailPage';
import PhotoDetailPage from './pages/Photo/PhotoDetailPage';
import { ThemeProvider, CssBaseline, Switch as ToggleSwitch, FormControlLabel, Box, Tooltip } from '@mui/material';
import { lightTheme, darkTheme } from './components/Themes';
import NavBar from './components/NavBar';
import { TodosProvider } from './pages/Todos/TodosContext';
import { PhotosProvider } from './pages/Photo/PhotosContext';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box sx={{ position: 'relative' }}>
          <Tooltip title={isDarkMode ? "Включить светлую тему" : "Включить темную тему"}>
            <FormControlLabel
              control={<ToggleSwitch checked={isDarkMode} onChange={toggleTheme} />}
              sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
            />
          </Tooltip>
          <Router>
            <TodosProvider>
              <PhotosProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<AppContent />} />
                    <Route path="photos" element={<PhotosPage />} />
                    <Route path="photos/:id" element={<PhotoDetailPage />} />
                    <Route path="todos" element={<TodosPage />} />
                    <Route path="todos/:id" element={<TodoDetailPage />} />
                  </Route>
                </Routes>
              </PhotosProvider>
            </TodosProvider>
          </Router>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default App;
