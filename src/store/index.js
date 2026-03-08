import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './slices/contactSlices';

import logger from 'redux-logger';

export default configureStore({
  reducer: { contactSlice },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
