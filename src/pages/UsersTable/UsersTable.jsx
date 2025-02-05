import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ModalWindow from './ModalWindow';

const fetchUsers = async () => {
  const response = await axios.get('https://backend.s3grdn.ru/api/test');
  return response.data;
};

const UsersTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const queryClient = useQueryClient();

  const { data: users, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const addUserMutation = useMutation({
    mutationFn: (newUser) => axios.post('https://backend.s3grdn.ru/api/test', newUser),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  const editUserMutation = useMutation({
    mutationFn: (updatedUser) => axios.post('https://backend.s3grdn.ru/api/test', updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => axios.delete('https://backend.s3grdn.ru/api/test', { data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  const openModal = (user = null) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setUserToEdit(null);
    setIsModalOpen(false);
  };

  const handleAddUser = (newUser) => {
    addUserMutation.mutate(newUser);
    closeModal();
  };

  const handleEditUser = (updatedUser) => {
    if (updatedUser._id) {
      editUserMutation.mutate(updatedUser);
      closeModal();
    } else {
      console.error('ID пользователя отсутствует');
    }
  };

  const handleDeleteUser = (id) => {
    deleteUserMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => openModal()}>
          Добавить пользователя
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Логин</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell>Пол</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} onMouseEnter={() => {}} onMouseLeave={() => {}}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.dateOfBirth}</TableCell>
                <TableCell>{user.gender ? 'Мужской' : 'Женский'}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openModal(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalWindow isOpen={isModalOpen} onClose={closeModal} userToEdit={userToEdit} onSubmit={userToEdit ? handleEditUser : handleAddUser} />
    </Box>
  );
};

export default UsersTable;
