import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ButtonGroup, Checkbox, ListItemIcon, Snackbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchTodos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
  return response.data;
};

const TodosPage = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: todos, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const handleToggle = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    queryClient.setQueryData(['todos'], updatedTodos);
  };

  const filteredTodos = todos?.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'notCompleted') {
      return !todo.completed;
    }
    return true;
  });

  const handleTodoClick = (id) => {
    navigate(`/todos/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Container sx={{ mt: 4 }}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'contained' : 'outlined'}
          >
            Все задачи
          </Button>
          <Button
            onClick={() => setFilter('completed')}
            variant={filter === 'completed' ? 'contained' : 'outlined'}
          >
            Выполненные задачи
          </Button>
          <Button
            onClick={() => setFilter('notCompleted')}
            variant={filter === 'notCompleted' ? 'contained' : 'outlined'}
          >
            Невыполненные задачи
          </Button>
        </ButtonGroup>
        {error && <Snackbar open={!!error} message={error.message} autoHideDuration={6000} />}
        {isLoading ? (
          <Typography variant="body1">Загрузка задач...</Typography>
        ) : (
          <List>
            {filteredTodos?.map((todo, index) => (
              <ListItem
                key={todo.id}
                className="list-item"
                onClick={() => handleTodoClick(todo.id)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${index + 1}. ${todo.title}`}
                  className={todo.completed ? 'completed' : ''}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Container>
  );
};

export default TodosPage;
