import * as Yup from 'yup';

export const phoneValidation = Yup.object().shape({
  phone: Yup.string()
    .min(10, () => 'Input valid number')
    .required('Input your phone number'),
});
