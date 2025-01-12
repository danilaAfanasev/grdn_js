import { useForm } from 'react-hook-form';

const useBookForm = (defaultValues, onSubmit) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export default useBookForm;
