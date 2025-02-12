import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import ModalWindow from './ModalWindow';
import { Male as MaleIcon, Female as FemaleIcon } from '@mui/icons-material';
import { useAddUser, useEditUser, useDeleteUser } from '../../hooks/useQuery';

const UsersTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showPassword, setShowPassword] = useState({});

  const { data: users = [], error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('https://backend.s3grdn.ru/api/test');
      return response.data;
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
    },
  });

  const addUserMutation = useAddUser();
  const editUserMutation = useEditUser();
  const deleteUserMutation = useDeleteUser();

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

  const togglePasswordVisibility = (userId) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2} mt={2}>
        <Button variant="contained" color="primary" onClick={() => openModal()} sx={{ marginRight: 2 }}>
          Добавить пользователя
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header" sx={{  width: '150px' }}>Имя</TableCell>
              <TableCell className="table-header" sx={{  width: '200px' }}>Email</TableCell>
              <TableCell className="table-header" sx={{  width: '150px' }}>Логин</TableCell>
              <TableCell className="table-header" sx={{  width: '150px' }}>Дата рождения</TableCell>
              <TableCell className="table-header" sx={{  width: '100px' }}>Пол</TableCell>
              <TableCell className="table-header" sx={{  width: '150px' }}>Дата</TableCell>
              <TableCell className="table-header" sx={{  width: '200px' }}>Пароль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.map((user) => (
              <TableRow
                key={user._id}
                sx={{
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  '&:hover .actions': { visibility: 'visible' },
                }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.dateOfBirth}</TableCell>
                <TableCell>{user.gender ? <MaleIcon /> : <FemaleIcon />}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell
                  sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
                >
                  {showPassword[user._id] ? user.password : '••••••••'}
                  <IconButton
                    onClick={() => togglePasswordVisibility(user._id)}
                    sx={{ marginLeft: 1 }}
                  >
                    {showPassword[user._id] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                  <Box
                    className="actions"
                    sx={{
                      display: 'flex',
                      visibility: 'hidden',
                      position: 'absolute',
                      right: 50,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <IconButton onClick={() => openModal(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
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
