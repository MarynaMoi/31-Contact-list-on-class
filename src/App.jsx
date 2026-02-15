import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import AllContactList from './components/AllContact/AllContactList';
import ContactForm from './components/ContactForm/ContactForm';
import api from './api/contact-service';
import styles from './App.module.css';

function App () {
  const createNewContact = () => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      id: null,
    };
  };

  const [userContacts, setUserContacts] = useState([]);
  const [contact, setContact] = useState(createNewContact());

  useEffect(() => {
    api
      .get('/')
      .then(({ data }) => {
        setUserContacts(data || []);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  const saveToLocalStor = user => {
    localStorage.setItem('userContacts', JSON.stringify(user));
  };

  const selectContact = contact => {
    setContact(contact);
  };

  const addNewContact = () => {
    setContact(createNewContact());
  };

  const saveContact = formContact => {
    if (!formContact.id) {
      formContact.id = nanoid();
      api
        .post('/', formContact)
        .then(({ data }) => {
          const updatedUserContacts = [...userContacts, data];
          setUserContacts(updatedUserContacts);
          setContact(createNewContact());
        })
        .catch(error => console.log('Error creating contact:', error));
    } else {
      api
        .put(`/${formContact.id}`, formContact)
        .then(({ data }) => {
          const updatedUserContacts = userContacts.map(item =>
            item.id === formContact.id ? data : item
          );
          setUserContacts(updatedUserContacts);
        })
        .catch(error => console.log('Error updating contact:', error));
    }
  };

  const deleteContact = id => {
    api
      .delete(`/${id}`)
      .then(({ status }) => console.log(status))
      .catch(error => console.log('Error deleting contact:', error));
    const user = userContacts.filter(item => item.id !== id);
    setUserContacts(user);
    setContact(createNewContact());
  };

  return (
    <>
      <div className={styles['title']}>Contact list</div>
      <div className={styles['list-and-redaction-div']}>
        <AllContactList
          userContacts={userContacts}
          selectContact={selectContact}
          addNewContact={addNewContact}
          deleteContact={deleteContact}
        />
        <ContactForm
          saveContact={saveContact}
          contactData={contact}
          deleteContact={deleteContact}
          createNewContact={createNewContact}
        />
      </div>
    </>
  );
}

export default App;
