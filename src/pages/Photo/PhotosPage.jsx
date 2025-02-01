import React from 'react';
import { Container, Box, Snackbar, CircularProgress, Card, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import photoUrls from './photoUrls';

const fetchPhotos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=20');
  return response.data;
};

const PhotosPage = () => {
  const navigate = useNavigate();

  const { data: photos, error, isLoading } = useQuery({
    queryKey: ['photos'], // Изменено на массив
    queryFn: fetchPhotos,
  });

  const updatedPhotos = photos?.map((photo, index) => ({
    ...photo,
    url: photoUrls[index]
  }));

  const handlePhotoClick = (id) => {
    navigate(`/photos/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Container sx={{ mt: 4 }}>
        {error && <Snackbar open={!!error} message={error.message} autoHideDuration={6000} />}
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {updatedPhotos?.map(photo => (
              <Card
                key={photo.id}
                sx={{
                  maxWidth: 345,
                  borderRadius: 4,
                  position: 'relative',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => handlePhotoClick(photo.id)}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={photo.url}
                  alt={photo.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default PhotosPage;
