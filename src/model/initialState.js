export const contactsState = [];
export const CONTACT_SLICE_NAME = 'contacts';
export const createNewContact = () => {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    id: null,
  };
};
