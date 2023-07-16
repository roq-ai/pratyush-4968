import * as yup from 'yup';

export const renamedclassValidationSchema = yup.object().shape({
  name: yup.string().required(),
  qr_code: yup.string().required(),
  wifi_name: yup.string().required(),
  school_id: yup.string().nullable(),
});
