import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import bookSchema from '../validation/bookSchema';

const useBookForm = (defaultValues, onSubmit) => {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(bookSchema),
    defaultValues,
  });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    setValue,
  };
};

export default useBookForm;
