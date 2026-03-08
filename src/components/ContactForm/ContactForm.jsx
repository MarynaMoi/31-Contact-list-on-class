import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  deleteContactItemAsync,
  updateContactItemAsync,
  addContactItemAsync,
} from './../../store/slices/contactSlices';
import styles from './ContactForm.module.css';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email required'),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, 'Phone must be in format +380XXXXXXXXX')
    .required('Phone required'),
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

  const renderInput = (
    name,
    placeholder,
    values,
    setFieldValue,
    errors = {},
    touched = {}
  ) => (
    <Box position='relative'>
      <Field
        as={TextField}
        name={name}
        placeholder={placeholder}
        variant='outlined'
        size='small'
        sx={{
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
          '& .MuiOutlinedInput-input': {
            padding: '6px 28px 6px 8px',
            fontSize: '14px',
          },
          '& .MuiFormHelperText-root': { padding: 0 },
        }}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name]}
      />

      {values[name] && (
        <Box
          onClick={() => setFieldValue(name, '')}
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            right: 4,
            top: 6,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CloseIcon
            fontSize='small'
            sx={{
              color: 'gray',
              width: 18,
              height: 18,
              boxSizing: 'content-box',
            }}
          />
        </Box>
      )}
    </Box>
  );

  const renderForm = ({ values, setFieldValue, isValid, touched, errors }) => {
    return (
      <Form className={styles['redaction-contact-div']}>
        {renderInput('firstName', 'First Name', values, setFieldValue)}
        {renderInput('lastName', 'Last Name', values, setFieldValue)}
        {renderInput('email', 'Email', values, setFieldValue, errors, touched)}
        {renderInput('phone', 'Phone', values, setFieldValue, errors, touched)}

        <div className={styles['divSaveAndDelete']}>
          <Button type='submit' variant='contained' disabled={!isValid}>
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
