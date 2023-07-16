import * as yup from 'yup';

export const attendanceValidationSchema = yup.object().shape({
  attended: yup.boolean().required(),
  user_id: yup.string().nullable(),
  class_id: yup.string().nullable(),
});
