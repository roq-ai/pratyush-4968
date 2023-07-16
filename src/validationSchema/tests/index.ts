import * as yup from 'yup';

export const testValidationSchema = yup.object().shape({
  name: yup.string().required(),
  class_id: yup.string().nullable(),
});
