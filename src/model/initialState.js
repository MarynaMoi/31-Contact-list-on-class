
export const createNewContact = () => {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    id: null,
  };
};

export const initialState = {
  contacts: [],
  contactItem: createNewContact(),
};
