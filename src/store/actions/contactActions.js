import ACTION_TYPES from './actionTypes';


export const getContacts = contacts => ({
  type: ACTION_TYPES.GET_CONTACTS,
  payload: contacts,
});

export const addContact = contactItem => ({
  type: ACTION_TYPES.ADD_CONTACT,
  payload: contactItem,
});

export const updateContact = contactItem => ({
  type: ACTION_TYPES.UPDATE_CONTACT,
  payload: contactItem,
});
export const deleteContact = id => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT,
    payload: id,
  };
};
export const selectContact = contactItem => {
  return {
    type: ACTION_TYPES.SELECT_CONTACT,
    payload: contactItem,
  };
};

export const addNewContact = () => {
  return {
    type: ACTION_TYPES.ADD_NEW_CONTACT,
  };
};


