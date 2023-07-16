import * as yup from 'yup';

export const videoValidationSchema = yup.object().shape({
  name: yup.string().required(),
  url: yup.string().required(),
  class_id: yup.string().nullable(),
});
