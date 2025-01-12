import React, { useState } from 'react';
import BookList from './BookList';
import Filter from './Filter';
import Sort from './Sort';
import Search from './Search';
import BookStats from './BookStats';
import ModalWindow from './ModalWindow';
import { AppBar, Toolbar, Typography, IconButton, Button, Container, Box, Snackbar } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddIcon from '@mui/icons-material/Add';
import '../styles/main.scss';

const AppContent = ({ isModalOpen, openModal, closeModal }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleBookRemoved = () => {
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <LibraryBooksIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Моя библиотека
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={openModal}>
            Добавить книгу
          </Button>
        </Toolbar>
      </AppBar>
      <ModalWindow isOpen={isModalOpen} onClose={closeModal} />
      <Box mt={4} mb={4} border={1} borderColor="grey.300" borderRadius={2} p={2}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Filter />
          <Sort />
          <Search />
        </Box>
        <BookStats />
      </Box>
      <BookList onBookRemoved={handleBookRemoved} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Книга была удалена"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </Container>
  );
};

export default AppContent;
