import { calcTotalPricetsts } from "./calcTotalPrice";

export const getCartFromLocalStoragetsts = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data): [];
    const totalPrice = calcTotalPricetsts(items);

    return{
        items,
        totalPrice,
    }
    
};