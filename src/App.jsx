import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppContent from './components/AppContent';
import { ThemeProvider, CssBaseline, Switch, FormControlLabel } from '@mui/material';
import { lightTheme, darkTheme } from './components/Themes';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <FormControlLabel
          control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
          label="Темная тема"
          sx={{ position: 'absolute', top: 10, right: 10 }}
        />
        <AppContent isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
