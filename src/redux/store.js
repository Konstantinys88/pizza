import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReduser from './slices/cartSlice'

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReduser,
	},
});