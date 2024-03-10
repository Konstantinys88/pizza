import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

type filterSliceState = {
	searchValue: string;
	title:string;
	indexCategories:number;
	indexCategoriesSort: number
}

const initialState: filterSliceState = {
	searchValue: '',
	title: 'Все',
	indexCategories: 0,
	indexCategoriesSort: 0,
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		titleFilter: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		pizzasFilter: (state, action: PayloadAction<number>) => {
			state.indexCategories = action.payload;
		},
		pizzasFilterSort: (state, action: PayloadAction<number>) => {
			state.indexCategoriesSort = action.payload;
		},
		setFilters: (state, action) => {
			state.indexCategoriesSort = +action.payload.indexCategoriesSort;
			state.indexCategories = +action.payload.indexCategories;
		}
	},
})

export const selectFilter = (state: RootState) => state.filter;

export const { titleFilter, pizzasFilter, pizzasFilterSort, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;