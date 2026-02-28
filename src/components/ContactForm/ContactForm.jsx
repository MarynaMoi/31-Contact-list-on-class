import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactFormInput from '../ContactFormInput/ContactFormInput';
import {
  addContact,
  addNewContact,
  updateContact,
} from '../../store/actions/contactActions';
import { useDeleteContact } from '../../hooks';
import api from '../../api/contact-service';
import styles from './ContactForm.module.css';

function ContactForm () {
  const dispatch = useDispatch();
  const contactItem = useSelector(state => state.contactItem);
  const [contact, setContact] = useState(contactItem);

  useEffect(() => {
    setContact(contactItem);
  }, [contactItem]);

  const handleChange = ev => {
    const { name, value } = ev.target;
    setContact(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearSelectInput = fieldName => {
    setContact(prev => ({
      ...prev,
      [fieldName]: '',
    }));
  };

  const onSaveContact = ev => {
    ev.preventDefault();

    if (!contact.id) {
      const newContact = { ...contact, id: nanoid() };

      api
        .post('/', newContact)
        .then(response => {
          dispatch(addContact(response.data));
          dispatch(addNewContact());
        })
        .catch(error => {
          console.error('Error creating contact:', error);
        });
    } else {
      api
        .put(`/${contact.id}`, contact)
        .then(response => {
          dispatch(updateContact(response.data));
        })
        .catch(error => {
          console.error('Error updating contact:', error);
        });
    }
  };
  const onDeleteContact = useDeleteContact();
  const handleDelete = ev => {
    ev.preventDefault();
    onDeleteContact(contact.id);
  };

  return (
    <>
      <form className={styles['redaction-contact-div']}>
        <ContactFormInput
          name='firstName'
          placeholder='First Name'
          value={contact.firstName}
          handleChange={handleChange}
          clearInput={clearSelectInput}
        />

        <ContactFormInput
          name='lastName'
          placeholder='Last Name'
          value={contact.lastName}
          handleChange={handleChange}
          clearInput={clearSelectInput}
        />

        <ContactFormInput
          name='email'
          placeholder='Email'
          value={contact.email}
          handleChange={handleChange}
          clearInput={clearSelectInput}
        />

        <ContactFormInput
          name='phone'
          placeholder='Phone'
          value={contact.phone}
          handleChange={handleChange}
          clearInput={clearSelectInput}
        />
        <div className={styles['divSaveAndDelete']}>
          <button onClick={onSaveContact}>Save</button>
          {contact.id !== null && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
      </form>
    </>
  );
}

export default ContactForm;
