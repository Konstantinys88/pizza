import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReduser from './slices/cart/slice';
import pizzasReduser from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReduser,
		pizzas: pizzasReduser,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();