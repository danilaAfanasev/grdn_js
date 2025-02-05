import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string()
    .required('Имя обязательно'),
  email: yup.string()
    .email('Некорректный email')
    .required('Email обязателен'),
  login: yup.string()
    .required('Логин обязателен'),
  password: yup.string()
    .matches(/^[0-9]+$/, 'Пароль должен содержать только цифры')
    .required('Пароль обязателен'),
  dateOfBirth: yup.string()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, 'Некорректный формат даты рождения (DD.MM.YYYY)')
    .required('Дата рождения обязательна'),
  gender: yup.boolean()
    .required('Пол обязателен'),
  date: yup.string()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, 'Некорректный формат даты (DD.MM.YYYY)')
    .required('Дата обязательна'),
});

export default userSchema;
