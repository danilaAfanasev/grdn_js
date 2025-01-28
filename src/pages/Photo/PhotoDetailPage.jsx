import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { usePhotos } from './PhotosContext';

const PhotoDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { photos } = usePhotos();
  const photo = photos.find(photo => photo.id === parseInt(id));

  if (!photo) {
    return <Typography>Фотография не найдена</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={photo.url}
          alt={photo.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {photo.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => navigate('/photos')}>
            Назад
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default PhotoDetailPage;
