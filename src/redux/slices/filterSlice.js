import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: 'Все'
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		titleFilter: (state, action) => {
			state.title = action.payload;
		}
	},
})

export const { titleFilter } = filterSlice.actions;
export default filterSlice.reducer;