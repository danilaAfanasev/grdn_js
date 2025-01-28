import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, ButtonGroup, Checkbox, ListItemIcon, Snackbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTodos } from './TodosContext';

const TodosPage = () => {
  const { todos, setTodos, error, loading } = useTodos();
  const [filter, setFilter] = React.useState('all');
  const navigate = useNavigate();

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

  const handleTodoClick = (id) => {
    navigate(`/todos/${id}`);
  };

  return (
    <Container maxWidth="lg">
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
              <ListItem
                key={todo.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleTodoClick(todo.id)}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                <ListItemIcon
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => e.stopPropagation()}
                  onMouseLeave={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${index + 1}. ${todo.title}`}
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
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
