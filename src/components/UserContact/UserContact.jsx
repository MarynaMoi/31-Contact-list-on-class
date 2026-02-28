import { useDispatch } from 'react-redux';
import { selectContact } from './../../store/actions/contactActions';
import { useDeleteContact } from '../../hooks';

import styles from './UserContact.module.css';

function UserContact ({ contact }) {
  const dispatch = useDispatch();

  const onDeleteContact = useDeleteContact();
  const handleDelete = ev => {
    ev.stopPropagation();
    onDeleteContact(contact.id);
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
