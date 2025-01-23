import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import AppContent from './components/AppContent';
import PhotosPage from './pages/PhotosPage';
import TodosPage from './pages/TodosPage';
import { ThemeProvider, CssBaseline, Switch as ToggleSwitch, FormControlLabel, Box } from '@mui/material';
import { lightTheme, darkTheme } from './components/Themes';

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
          <FormControlLabel
            control={<ToggleSwitch checked={isDarkMode} onChange={toggleTheme} />}
            label={isDarkMode ? "Включить светлую тему" : "Включить темную тему"}
            sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
          />
          <Router>
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/photos" element={<PhotosPage />} />
              <Route path="/todos" element={<TodosPage />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
