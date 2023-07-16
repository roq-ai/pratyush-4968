import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRenamedclass } from 'apiSdk/renamedclasses';
import { Error } from 'components/error';
import { renamedclassValidationSchema } from 'validationSchema/renamedclasses';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { SchoolInterface } from 'interfaces/school';
import { getSchools } from 'apiSdk/schools';
import { RenamedclassInterface } from 'interfaces/renamedclass';

function RenamedclassCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RenamedclassInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRenamedclass(values);
      resetForm();
      router.push('/renamedclasses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RenamedclassInterface>({
    initialValues: {
      name: '',
      qr_code: '',
      wifi_name: '',
      school_id: (router.query.school_id as string) ?? null,
    },
    validationSchema: renamedclassValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Renamedclass
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="qr_code" mb="4" isInvalid={!!formik.errors?.qr_code}>
            <FormLabel>Qr Code</FormLabel>
            <Input type="text" name="qr_code" value={formik.values?.qr_code} onChange={formik.handleChange} />
            {formik.errors.qr_code && <FormErrorMessage>{formik.errors?.qr_code}</FormErrorMessage>}
          </FormControl>
          <FormControl id="wifi_name" mb="4" isInvalid={!!formik.errors?.wifi_name}>
            <FormLabel>Wifi Name</FormLabel>
            <Input type="text" name="wifi_name" value={formik.values?.wifi_name} onChange={formik.handleChange} />
            {formik.errors.wifi_name && <FormErrorMessage>{formik.errors?.wifi_name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<SchoolInterface>
            formik={formik}
            name={'school_id'}
            label={'Select School'}
            placeholder={'Select School'}
            fetcher={getSchools}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'Renamedclass',
    operation: AccessOperationEnum.CREATE,
  }),
)(RenamedclassCreatePage);
