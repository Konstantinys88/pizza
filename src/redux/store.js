import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReduser from './slices/cartSlice'
import pizzasReduser from './slices/pizzasSlice'

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReduser,
		pizzas: pizzasReduser,
	},
});