// import {createStore} from 'redux'
// import contactReducer from './reducers/contactReducer'

// const store = createStore(contactReducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './reducers/contactReducer';
import logger from 'redux-logger';

export default configureStore({
  reducer: { contactReducer: contactReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
