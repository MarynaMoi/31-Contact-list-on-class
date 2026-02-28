import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import UserContact from '../UserContact/UserContact';
import api from '../../api/contact-service';
import { addNewContact, getContacts, } from './../../store/actions/contactActions';
import styles from './AllContactList.module.css';

function AllContactList () {
  const dispatch = useDispatch();
  const userContacts = useSelector(state => state.contacts);


  useEffect(() => {
    api
      .get('/')
      .then(({ data }) => {
        dispatch(getContacts(data || []));
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, [dispatch]);



  return (
    <div className={styles['all-contact-div']}>
      {userContacts.map(item => (
        <UserContact key={item.id} contact={item} />
      ))}

      <button
        className={styles['add-contact-btn']}
        onClick={() => dispatch(addNewContact())}
      >
        New
      </button>
    </div>
  );
}

export default AllContactList;



