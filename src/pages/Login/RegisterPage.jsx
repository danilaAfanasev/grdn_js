import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert, InputAdornment, Fade, Link } from '@mui/material';
import { AccountCircle, Lock, PersonAdd as RegisterIcon } from '@mui/icons-material';
import '../../styles/main.scss';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordInput !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.get('https://backend.s3grdn.ru/api/test');
      const users = response.data;

      if (users.some((u) => u.login === loginInput)) {
        setError('Пользователь с таким логином уже существует');
        return;
      }

      const newUser = {
        name,
        login: loginInput,
        password: passwordInput,
        email: `${loginInput}@example.com`,
        dateOfBirth: '01.01.1990',
        gender: true,
        date: '01.01.2023',
      };

      await axios.post('https://backend.s3grdn.ru/api/test', newUser);
      setError('');
      navigate('/login');
    } catch (err) {
      setError('Ошибка при регистрации');
      console.error('Ошибка:', err);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box className="neon-circle" sx={{ width: 100, height: 100, top: '10%', left: '15%' }} />
      <Box className="neon-circle" sx={{ width: 150, height: 150, bottom: '20%', right: '20%' }} />
      <Box className="neon-circle" sx={{ width: 80, height: 80, top: '30%', right: '10%' }} />

      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            width: '100%',
            maxWidth: 400,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'border-color 0.3s ease-in-out',
            '&:hover': { borderColor: 'rgba(255, 64, 129, 0.8)' },
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}
          >
            Регистрация
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
            Создайте новый аккаунт
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Имя"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              label="Логин"
              variant="outlined"
              fullWidth
              margin="normal"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              label="Подтвердите пароль"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>
                  {error}
                </Alert>
              </Fade>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<RegisterIcon />}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': { boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' },
              }}
            >
              Зарегистрироваться
            </Button>
          </form>
          <Typography sx={{ mt: 2 }}>
            Уже есть аккаунт?{' '}
            <Link component="button" onClick={() => navigate('/login')} underline="hover">
              Войти
            </Link>
          </Typography>
        </Box>
      </Fade>
    </Container>
  );
};

export default RegisterPage;
