import { useDispatch } from 'react-redux';
import {deleteContactItemAsync,selectContact} from '../../store/slices/contactSlices'

import styles from './UserContact.module.css';

function UserContact ({ contact }) {
  const dispatch = useDispatch();


  const handleDelete = ev => {
    ev.stopPropagation();
   dispatch(deleteContactItemAsync(contact.id));
  };

  const onSelectContact = ev => {
    ev.stopPropagation();
    dispatch(selectContact(contact));
  };

  return (
    <div className={styles['user-contact']}>
      <div onDoubleClick={onSelectContact}>
        {contact.firstName} {contact.lastName}
        <span className={styles.deleteX} onClick={handleDelete}>
          X
        </span>
      </div>
    </div>
  );
}

export default UserContact;
