import { contactsState, createNewContact } from '../../model/initialState';
import ACTION_TYPES from './../actions/actionTypes';
const initialState = {
  contactsUser: contactsState,
  contact: createNewContact(),
};
export default function contactReducer (
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ACTION_TYPES.ADD_CONTACT:
      return {
        ...state,
        contactsUser: [...state.contactsUser, payload],
      }; 

    case ACTION_TYPES.UPDATE_CONTACT:
      return {
        ...state,
        contactsUser: state.contactsUser.map(item =>
          item.id === payload.id ? payload : item
        ),
      };

    case ACTION_TYPES.UPDATE_CONTACTS:
      return {
        ...state,
        contactsUser: payload,
      };

    case ACTION_TYPES.DELETE_CONTACT:
      return {
        ...state,
        contactsUser: state.contactsUser.filter(item => item.id !== payload),
      };

    case ACTION_TYPES.SELECT_CONTACT:
      return { ...state, contact: payload };

    case ACTION_TYPES.ADD_NEW_CONTACT:
      return { ...state, contact: payload };

    default:
      return state;
  }
}
