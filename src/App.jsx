import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Добавлен useSelector
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import { login } from './redux/authSlice';
import AppContent from './components/AppContent';
import PhotosPage from './pages/Photo/PhotosPage';
import TodosPage from './pages/Todos/TodosPage';
import TodoDetailPage from './pages/Todos/TodoDetailPage';
import PhotoDetailPage from './pages/Photo/PhotoDetailPage';
import UsersTable from './pages/UsersTable/UsersTable';
import ChartsPage from './pages/Charts/ChartsPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Login/RegisterPage';
import Page404 from './pages/404/Page404';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './components/Themes';
import NavBar from './components/NavBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const { authed, user } = JSON.parse(savedAuth);
      if (authed && user) {
        dispatch(login(user));
      }
    }
  }, [dispatch]);

  return null;
};

const Auth = () => <Outlet />;

const Layout = ({ isDarkMode, toggleTheme }) => {
  const authed = useSelector((state) => state.auth.authed);
  if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Outlet />
    </>
  );
};

const getSavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? JSON.parse(savedTheme) : false;
};

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(getSavedTheme);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Box sx={{ position: 'relative' }}>
            <AuthInitializer />
            <Router>
              <Routes>
                <Route element={<Auth />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="resetPassword/:reset" element={<div>Сброс пароля с токеном (заглушка)</div>} />
                  <Route path="resetPassword" element={<div>Сброс пароля (заглушка)</div>} />
                </Route>
                <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}>
                  <Route index element={<AppContent />} />
                  <Route path="photos" element={<PhotosPage />} />
                  <Route path="photos/:id" element={<PhotoDetailPage />} />
                  <Route path="todos" element={<TodosPage />} />
                  <Route path="todos/:id" element={<TodoDetailPage />} />
                  <Route path="users" element={<UsersTable />} />
                  <Route path="charts" element={<ChartsPage />} />
                </Route>
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Router>
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;