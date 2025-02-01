import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import photoUrls from './photoUrls';

const fetchPhotos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=20');
  return response.data;
};

const PhotoDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: photos, error, isLoading } = useQuery({
    queryKey: ['photos'], // Изменено на массив
    queryFn: fetchPhotos,
  });

  const updatedPhotos = photos?.map((photo, index) => ({
    ...photo,
    url: photoUrls[index]
  }));

  const photo = updatedPhotos?.find(photo => photo.id === parseInt(id));

  if (isLoading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (error) {
    return <Typography>Ошибка загрузки фотографии</Typography>;
  }

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
