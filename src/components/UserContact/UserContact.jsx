import { useDispatch } from 'react-redux';
import {
  deleteContactItemAsync,
  selectContact,
} from '../../store/slices/contactSlices';

import { Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    <Paper
      elevation={1}
      onDoubleClick={onSelectContact}
      sx={{
        m: '10px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <span>
        {contact.firstName} {contact.lastName}
      </span>

      <CloseIcon
        onClick={handleDelete}
        fontSize='small'
        sx={{
          color: 'gray',
          width: 18,
          height: 18,
          boxSizing: 'content-box',
            backgroundColor: '#ffffff'
        }}
      />
    </Paper>
  );
}

export default UserContact;
