import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';

type fetchPizzasArgs = {
	curentPage: string; 
	indexCategories: number;
	apiCategories: string;
	sortOrder: string;
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params: fetchPizzasArgs) => {
	const { curentPage, indexCategories, apiCategories, sortOrder } = params;
	const { data } = await axios.get(`https://65a65e8d74cf4207b4efdc2c.mockapi.io/items?page=${curentPage}&limit=8&${indexCategories > 0 ? `category=${indexCategories}` : ''}&sortBy=${apiCategories}&order=${sortOrder}`);
	return data;
});

type PizzaItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: number;
	size: number;
	count: number;
}

interface PizzaSliceState {
	itemsPizzas: PizzaItem[];
	status: string;
}

const initialState: PizzaSliceState = {
	itemsPizzas: [],
	status: '',
};

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.itemsPizzas = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading';
				state.itemsPizzas = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.itemsPizzas = action.payload;
				state.status = 'success';
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = 'error';
				state.itemsPizzas = [];
			})
	}
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
