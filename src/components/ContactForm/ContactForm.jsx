import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Box } from '@mui/material';
import {
  deleteContactItemAsync,
  updateContactItemAsync,
  addContactItemAsync,
  selectContact,
} from './../../store/slices/contactSlices';
import { createNewContact } from '../../model/initialState';
import styles from './ContactForm.module.css';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Невірний формат email')
    .required('Введіть Email'),
  phone: yup
    .string()
    .min(10, 'Номер телефону має містити мінімум 10 символів')
    .required('Введіть номер телефону'),
});

function ContactForm () {
  const dispatch = useDispatch();
  const contactItem = useSelector(state => state.contactSlice.contactItem);

  const onSaveContact = (values, { resetForm }) => {
    console.log(values);
    if (!values.id) {
      const newContact = { ...values, id: nanoid() };
      dispatch(addContactItemAsync(newContact));
      resetForm();
    } else {
      dispatch(updateContactItemAsync(values));
    }
  };

  const handleDelete = () => {
    dispatch(deleteContactItemAsync(contactItem.id));
  };

  const renderForm = ({ values, setFieldValue, isValid, dirty }) => {
    return (
      <Form className={styles['redaction-contact-div']}>
        <Box position='relative'>
          <Field
            as={TextField}
            name='firstName'
            placeholder='First Name'
            size='small'
          />
          {values.firstName && (
            <span
              className={styles.clearX}
              onClick={() => setFieldValue('firstName', '')}
            >
              ✕
            </span>
          )}
        </Box>
        <Box position='relative'>
          <Field name='lastName' placeholder='Last Name' />
          {values.lastName && (
            <span
              className={styles.clearX}
              onClick={() => setFieldValue('lastName', '')}
            >
              ✕
            </span>
          )}
        </Box>
        <Box position='relative'>
          <Field name='email' placeholder='Email' />
          {values.email && (
            <span
              className={styles.clearX}
              onClick={() => setFieldValue('email', '')}
            >
              ✕
            </span>
          )}
          <ErrorMessage name='email' component='div' />
        </Box>
        <Box position='relative'>
          <Field name='phone' placeholder='Phone' />
          {values.phone && (
            <span
              className={styles.clearX}
              onClick={() => setFieldValue('phone', '')}
            >
              ✕
            </span>
          )}
          <ErrorMessage name='phone' component='div' className={styles.error} />
        </Box>
        <div className={styles['divSaveAndDelete']}>
          <Button
            type='submit'
            variant='contained'
            disabled={!dirty || !isValid}
          >
            Save
          </Button>
          {contactItem.id !== null && (
            <Button type='button' variant='outlined' onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </Form>
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={contactItem}
      validationSchema={schema}
      onSubmit={onSaveContact}
    >
      {renderForm}
    </Formik>
  );
}

export default ContactForm;
