import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import masterDataReducer from './slices/masterDataSlice';

export const store = configureStore({
  reducer: {
    sales: orderReducer,
    masterData: masterDataReducer,
  },
});