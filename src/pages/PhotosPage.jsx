import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, IconButton, Link, Snackbar, CircularProgress } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link as RouterLink } from 'react-router-dom';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=20')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched photos:', data);
        setPhotos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        setError('Не удалось загрузить фотографии. Пожалуйста, попробуйте позже.');
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <LibraryBooksIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              Моя библиотека
            </Link>
            {' | '}
            <Link component={RouterLink} to="/photos" color="inherit" underline="none">
              Фото
            </Link>
            {' | '}
            <Link component={RouterLink} to="/todos" color="inherit" underline="none">
              Список дел
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {error && <Snackbar open={!!error} message={error} autoHideDuration={6000} />}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {photos.map(photo => (
              <Box key={photo.id} m={1} p={1} border={1} borderColor="grey.300" borderRadius={2} textAlign="center">
                <img src={photo.thumbnailUrl} alt={photo.title} style={{ width: '150px', height: '150px', objectFit: 'cover', display: 'block', margin: '0 auto' }} />
                <Typography variant="body2">{photo.title}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default PhotosPage;
