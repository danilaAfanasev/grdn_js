import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import UserForm from './UserForm';

const ModalWindow = ({ isOpen, onClose, userToEdit, onSubmit }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{userToEdit ? 'Редактировать пользователя' : 'Добавить пользователя'}</DialogTitle>
      <DialogContent>
        <UserForm onClose={onClose} userToEdit={userToEdit} onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button onClick={onClose} color="primary">
            Отмена
          </Button>
          <Button type="submit" form="user-form" color="primary">
            {userToEdit ? 'Сохранить изменения' : 'Добавить пользователя'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
