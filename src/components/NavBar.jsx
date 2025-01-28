import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Link } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

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
            sx={{ textDecoration: location.pathname === '/' ? 'underline' : 'none' }}
          >
            Моя библиотека
          </Link>
          {' | '}
          <Link
            component={RouterLink}
            to="/photos"
            color="inherit"
            underline="none"
            sx={{ textDecoration: location.pathname === '/photos' ? 'underline' : 'none' }}
          >
            Фото
          </Link>
          {' | '}
          <Link
            component={RouterLink}
            to="/todos"
            color="inherit"
            underline="none"
            sx={{ textDecoration: location.pathname === '/todos' ? 'underline' : 'none' }}
          >
            Список дел
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
