import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .then(response => {
        console.log('Fetched todos:', response.data);
        setTodos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setError('Не удалось загрузить задачи. Пожалуйста, попробуйте позже.');
        setLoading(false);
      });
  }, []);

  return (
    <TodosContext.Provider value={{ todos, setTodos, error, loading }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
