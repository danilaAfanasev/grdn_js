import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { AppBar, Toolbar, Typography, IconButton, Link, Button, Switch, FormControlLabel } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NavBar = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <LibraryBooksIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            underline="none"
            sx={{ textDecoration: location.pathname === '/' ? 'underline' : 'none', mr: 1 }}
          >
            Моя библиотека
          </Link>
          {' | '}
          <Link
            component={RouterLink}
            to="/photos"
            color="inherit"
            underline="none"
            sx={{ textDecoration: location.pathname === '/photos' ? 'underline' : 'none', mr: 1 }}
          >
            Фото
          </Link>
          {' | '}
          <Link
            component={RouterLink}
            to="/todos"
            color="inherit"
            underline="none"
            sx={{ textDecoration: location.pathname === '/todos' ? 'underline' : 'none', mr: 1 }}
          >
            Список дел
          </Link>
          {' | '}
          <Link
            component={RouterLink}
            to="/users"
            color="inherit"
            underline="none"
            sx={{ textDecoration: location.pathname === '/users' ? 'underline' : 'none', mr: 1 }}
          >
            Пользователи
          </Link>
          {' | '}
          <Link
            component={RouterLink}
            to="/charts"
            color="inherit"
            underline="none"
            sx={{ textDecoration: location.pathname === '/charts' ? 'underline' : 'none', mr: 1 }}
          >
            Графики
          </Link>
        </Typography>
        <FormControlLabel
          control={<Switch checked={isDarkMode} onChange={toggleTheme} color="default" />}
          label={undefined}
          sx={{ mr: 2 }}
        />
        <Button
          color="inherit"
          startIcon={<ExitToAppIcon />}
          onClick={handleLogout}
          sx={{
            textTransform: 'none',
            fontWeight: 'normal',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;