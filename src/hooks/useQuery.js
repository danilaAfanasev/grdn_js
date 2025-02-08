import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => axios.post('https://backend.s3grdn.ru/api/test', newUser),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedUser) => axios.post('https://backend.s3grdn.ru/api/test', updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axios.delete('https://backend.s3grdn.ru/api/test', { data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};