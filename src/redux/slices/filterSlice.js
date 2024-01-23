import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Все',
	indexCategories: 0,
	indexCategoriesSort: 0,
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		titleFilter: (state, action) => {
			state.title = action.payload;
		},
		pizzasFilter: (state, action) => {
			state.indexCategories = action.payload;
		},
		pizzasFilterSort: (state, action) => {
			state.indexCategoriesSort = action.payload;
		},
	},
})

export const { titleFilter, pizzasFilter, pizzasFilterSort } = filterSlice.actions;
export default filterSlice.reducer;