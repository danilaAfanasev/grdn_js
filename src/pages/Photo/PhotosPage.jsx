import React from 'react';
import { Container, Box, Snackbar, CircularProgress, Card, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePhotos } from './PhotosContext';

const PhotosPage = () => {
  const { photos, error, loading } = usePhotos();
  const navigate = useNavigate();

  const handlePhotoClick = (id) => {
    navigate(`/photos/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Container sx={{ mt: 4 }}>
        {error && <Snackbar open={!!error} message={error} autoHideDuration={6000} />}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {photos.map(photo => (
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
