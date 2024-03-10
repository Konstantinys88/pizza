import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartItem = {
    id: string;
    title: string;
    type: string;
    price: number;
    count: number;
    imageUrl: string;
    size: number;
}

interface CartSliceState {
	totalPrice:number;
	items: CartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItem>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1, });
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return (+obj.price * +obj.count) + +sum;
			}, 0);

		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(obj => obj.id !== action.payload);
		},
		clearItem: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
		minusItem: (state, action: PayloadAction<string>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return (+obj.price * +obj.count) + +sum;
			}, 0);

			if (findItem?.count === 0) {
				state.items = state.items.filter(obj => obj.id !== action.payload);
			}
		},
	},
})

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;