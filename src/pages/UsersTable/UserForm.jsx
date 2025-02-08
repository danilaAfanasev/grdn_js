import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../../redux/userSlice';
import { Controller } from 'react-hook-form';
import { TextField, RadioGroup, FormControlLabel, Radio, Box, Typography, Alert, IconButton } from '@mui/material';
import useUserForm from '../../hooks/useUserForm';
import axios from 'axios';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';

const UserForm = ({ onClose, userToEdit, onSubmit }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control, errors, setValue, watch } = useUserForm(
    {
      name: '',
      email: '',
      login: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      gender: false,
      date: '',
    },
    async (data) => {
      const newUser = {
        _id: userToEdit ? userToEdit._id : undefined,
        ...data,
      };

      if (data.password !== data.confirmPassword) {
        setErrorMessage('Пароли не совпадают.');
        return;
      }

      try {
        const response = await axios.get('https://backend.s3grdn.ru/api/test');
        const users = response.data;
        const emailExists = users.some(user => user.email === newUser.email && user._id !== newUser._id);
        const loginExists = users.some(user => user.login === newUser.login && user._id !== newUser._id);

        if (emailExists) {
          setErrorMessage('Пользователь с таким email уже существует.');
        } else if (loginExists) {
          setErrorMessage('Пользователь с таким логином уже существует.');
        } else {
          setErrorMessage('');
          if (userToEdit) {
            dispatch(editUser(newUser));
          } else {
            dispatch(addUser(newUser));
          }
          onSubmit(newUser);
        }
      } catch (error) {
        console.error('Ошибка при проверке уникальности email и логина:', error);
      }
    }
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      Object.entries(userToEdit).forEach(([name, value]) => {
        setValue(name, value);
      });
    }
  }, [userToEdit, setValue]);

  return (
    <form id="user-form" onSubmit={handleSubmit}>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <TextField
        {...register('name')}
        label="Имя"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register('email')}
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('login')}
        label="Логин"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.login}
        helperText={errors.login?.message}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <TextField
          {...register('password')}
          label="Пароль"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          type={showPassword ? 'text' : 'password'}
        />
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          sx={{ position: 'absolute', right: 10, top: '55%', transform: 'translateY(-50%)' }}
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Box>
      <TextField
        {...register('confirmPassword')}
        label="Подтвердите пароль"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        type="password"
      />
      <TextField
        {...register('dateOfBirth')}
        label="Дата рождения"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.dateOfBirth}
        helperText={errors.dateOfBirth?.message}
      />
      <Controller
        name="gender"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <RadioGroup {...field} row>
            <FormControlLabel value={true} control={<Radio />} label="Мужской" />
            <FormControlLabel value={false} control={<Radio />} label="Женский" />
          </RadioGroup>
        )}
      />
      <TextField
        {...register('date')}
        label="Дата"
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.date}
        helperText={errors.date?.message}
      />
      {errors.gender && <Typography color="error">{errors.gender.message}</Typography>}
    </form>
  );
};

export default UserForm;
