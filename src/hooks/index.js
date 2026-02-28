import { useDispatch } from 'react-redux';
import api from '../api/contact-service';
import {
  deleteContact,
  addNewContact,
} from '../store/actions/contactActions';


export function useDeleteContact () {
  const dispatch = useDispatch();
  const onDeleteContact = id => {
    api
      .delete(`/${id}`)
      .then(() => {
        dispatch(deleteContact(id));
        dispatch(addNewContact());
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  };
  return onDeleteContact;
}