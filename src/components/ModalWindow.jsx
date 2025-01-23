import React from 'react';
import BookForm from './BookForm';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

const ModalWindow = ({ isOpen, onClose, bookToEdit }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{bookToEdit ? 'Редактировать книгу' : 'Добавить книгу'}</DialogTitle>
      <DialogContent>
        <BookForm onClose={onClose} bookToEdit={bookToEdit} />
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button onClick={onClose} color="primary">
            Отмена
          </Button>
          <Button type="submit" form="book-form" color="primary">
            {bookToEdit ? 'Сохранить изменения' : 'Добавить книгу'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
