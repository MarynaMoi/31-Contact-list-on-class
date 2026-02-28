import { initialState, createNewContact } from '../../model/initialState';
import ACTION_TYPES from './../actions/actionTypes';

export default function contactReducer (
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ACTION_TYPES.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };


    case ACTION_TYPES.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(item =>
          item.id === payload.id ? payload : item
        ),
      };



    case ACTION_TYPES.GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
      };

    case ACTION_TYPES.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(item => item.id !== payload),
      };


    case ACTION_TYPES.SELECT_CONTACT: 
      return { ...state, contactItem: payload };


    case ACTION_TYPES.ADD_NEW_CONTACT:
      return { ...state, contactItem: createNewContact() };

    default:
      return state;
  }
}
