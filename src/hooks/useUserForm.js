import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userSchema from '../pages/UsersTable/validation/userSchema';

const useUserForm = (defaultValues, onSubmit) => {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(userSchema),
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

export default useUserForm;
