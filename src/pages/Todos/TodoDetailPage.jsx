import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { useTodos } from './TodosContext';

const TodoDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { todos } = useTodos();
  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return <Typography>Задача не найдена</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {todo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {todo.completed ? 'Выполнено' : 'Не выполнено'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => navigate('/todos')}>
            Назад
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default TodoDetailPage;
