import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { AppBar, Toolbar, Typography, IconButton, Link, Button, Switch, FormControlLabel } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NavBar = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { path: '/', label: 'Моя библиотека' },
    { path: '/photos', label: 'Фото' },
    { path: '/todos', label: 'Список дел' },
    { path: '/users', label: 'Пользователи' },
    { path: '/charts', label: 'Графики' },
    { path: '/tasks', label: 'Мои задачи' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <LibraryBooksIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          {navLinks.map(({ path, label }, index) => (
            <React.Fragment key={path}>
              <Link
                component={RouterLink}
                to={path}
                color="inherit"
                underline="none"
                sx={{
                  textDecoration: location.pathname === path ? 'underline' : 'none',
                  mr: 2,
                }}
              >
                {label}
              </Link>
              {index < navLinks.length - 1 && <Typography sx={{ color: 'inherit', mr: 2 }}>|</Typography>}
            </React.Fragment>
          ))}
        </Typography>

        {user && (
          <Typography variant="subtitle1" sx={{ mr: 2, color: 'inherit' }}>
            Привет, {user.name}!
          </Typography>
        )}

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
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          }}
        >
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
