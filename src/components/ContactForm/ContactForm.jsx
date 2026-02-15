import { useState, useEffect } from 'react';
import ContactFormInput from '../ContactFormInput/ContactFormInput';
import styles from './ContactForm.module.css';

function ContactForm ({
  saveContact,
  contactData,
  deleteContact,
  createNewContact,
}) {
  const [contact, setContact] = useState(contactData);

  useEffect(() => {
    setContact(contactData);
  }, [contactData]);

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
    const newContact = { ...contact };
    saveContact(newContact);
    if (!contact.id) {
      setContact(createNewContact());
    }
  };

  const onDeleteContact = ev => {
    ev.preventDefault();

    deleteContact(contact.id);
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
            <button onClick={onDeleteContact}>Delete</button>
          )}
        </div>
      </form>
    </>
  );
}

export default ContactForm;
