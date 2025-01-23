import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Link, Snackbar, Button, ButtonGroup, Checkbox, ListItemIcon } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link as RouterLink } from 'react-router-dom';

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'notCompleted'

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched todos:', data);
        setTodos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setError('Не удалось загрузить задачи. Пожалуйста, попробуйте позже.');
        setLoading(false);
      });
  }, []);

  const handleToggle = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'notCompleted') {
      return !todo.completed;
    }
    return true;
  });

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
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => setFilter('all')}>Все задачи</Button>
          <Button onClick={() => setFilter('completed')}>Выполненные задачи</Button>
          <Button onClick={() => setFilter('notCompleted')}>Невыполненные задачи</Button>
        </ButtonGroup>
        {error && <Snackbar open={!!error} message={error} autoHideDuration={6000} />}
        {loading ? (
          <Typography variant="body1">Загрузка задач...</Typography>
        ) : (
          <List>
            {filteredTodos.map((todo, index) => (
              <ListItem key={todo.id}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                  />
                </ListItemIcon>
                <ListItemText primary={`${index + 1}. ${todo.title}`} secondary={todo.completed ? 'Выполнено' : 'Не выполнено'} />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Container>
  );
};

export default TodosPage;
