import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/contact-service';

import {
  contactsState,
  createNewContact,
  CONTACT_SLICE_NAME,
} from '../../model/initialState';

const initialState = {
  contacts: contactsState,
  contactItem: createNewContact(),
  isFetching: false,
  error: null,
};
const setFetching = state => {
  state.isFetching = true;
  state.error = null;
};
const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};

export const getContactsAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/getContactsAsync`,
  async function (__, { rejectWithValue, dispatch }) {
    try {
      const response = await api.get(`/${CONTACT_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Error fetching contacts:');
      }
      const { data } = response;
      // dispatch(getContacts(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteContactItemAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/deleteContactItemAsync`,
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await api.delete(`/${CONTACT_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error('Error delete contact:');
      }
      dispatch(removeContact(id));
      dispatch(addNewContact());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateContactItemAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/updateContactItemAsync`,
  async function (contact, { rejectWithValue, dispatch }) {
    try {
      const response = await api.put(
        `/${CONTACT_SLICE_NAME}/${contact.id}`,
        contact
      );
      if (response.status >= 400) {
        throw new Error('Error updating contact:');
      }
      const { data } = response;
      dispatch(updateContact(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addContactItemAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/addContactItemAsync`,
  async function (contact, { rejectWithValue, dispatch }) {
    console.log(contact);
    try {
      const response = await api.post(`/${CONTACT_SLICE_NAME}`, contact);
      if (response.status >= 400) {
        throw new Error('Error add contact:');
      }
      dispatch(addContact(response.data));
      dispatch(addNewContact());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: CONTACT_SLICE_NAME,
  initialState,
  reducers: {
    addContact (state, { payload }) {
      state.contacts = [...state.contacts, payload];
    },
    updateContact (state, { payload }) {
      state.contacts = state.contacts.map(item =>
        item.id === payload.id ? payload : item
      );
    },
    // getContacts (state, { payload }) {
    //   state.contacts = payload;
    // },
    removeContact (state, { payload }) {
      state.contacts = state.contacts.filter(item => item.id !== payload);
    },
    selectContact (state, { payload }) {
      state.contactItem = payload;
    },
    addNewContact (state) {
      state.contactItem = createNewContact();
    },
  },
  extraReducers: builder => {
    builder.addCase(getContactsAsync.fulfilled, (state, action) => {
      //цей getContactsAsync.fulfilled замість reducer:{getContacts} та dispatch(getContacts(data));
      state.contacts = action.payload;
      (state.isFetching = false), (state.error = null);
    });
    builder.addCase(getContactsAsync.rejected, setError);
    builder.addCase(getContactsAsync.pending, setFetching);
    builder.addCase(deleteContactItemAsync.rejected, setError);
    builder.addCase(deleteContactItemAsync.pending, setFetching);
    builder.addCase(updateContactItemAsync.rejected, setError);
    builder.addCase(updateContactItemAsync.pending, setFetching);
    builder.addCase(addContactItemAsync.rejected, setError);
    builder.addCase(addContactItemAsync.pending, setFetching);
  },
});

const { actions, reducer } = contactSlice;
const { addContact, updateContact, getContacts, removeContact } = actions;
export const { selectContact, addNewContact } = actions;
export default reducer;
