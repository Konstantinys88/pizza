import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	searchValue: '',
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
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
		pizzasFilter: (state, action) => {
			state.indexCategories = action.payload;
		},
		pizzasFilterSort: (state, action) => {
			state.indexCategoriesSort = action.payload;
		},
		setFilters: (state, action) => {
			state.indexCategoriesSort = +action.payload.indexCategoriesSort;
			state.indexCategories = +action.payload.indexCategories;
		}
	},
})

export const selectFilter = (state) => state.filter;

export const { titleFilter, pizzasFilter, pizzasFilterSort, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;