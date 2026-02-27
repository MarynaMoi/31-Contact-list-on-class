import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { contactsState } from '../../model/initialState';

const initialState = {
  contactsUser: contactsState,
  contact: createNewContact(),
};

const CONTACT_SLICE_NAME = 'contactsUser2';

const contactSlice = createSlice({
  name: CONTACT_SLICE_NAME,
  initialState,
  reducers: {
    addContact (state, { payload }) {
      state.contactsUser = [...state.contactsUser, payload];
    },
    updateContact (state, { payload }) {
      state.contactsUser = [
        state.contactsUser.filter(item => item.id !== payload),
      ];
    },
    updateContacts (state, { payload }) {
      state.contactsUser = payload;
    },
    removeContact (state, { payload }) {
      state.contactsUser = [
        state.contactsUser.filter(item => item.id !== payload),
      ];
    },
    selectContact (state, { payload }) {
      state.contact = [state.contact, payload];
    },
    addNewContact (state, { payload }) {
      state.contact = [state.contact, payload];
    },
  },
});

const { actions, reducer } = contactSlice;
const { addContact, updateContacts, removeContact, selectContact } = actions;
