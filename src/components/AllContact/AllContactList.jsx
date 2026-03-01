import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import UserContact from '../UserContact/UserContact';
import {getContactsAsync,addNewContact} from './../../store/slices/contactSlices'

import styles from './AllContactList.module.css';

function AllContactList () {
  const dispatch = useDispatch();
  const userContacts = useSelector(state => state.contactSlice.contacts);

  useEffect(() => {dispatch(getContactsAsync())},[dispatch])

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



