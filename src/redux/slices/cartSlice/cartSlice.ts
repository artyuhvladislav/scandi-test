import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CurrencyItemT } from "../headerSlice/headerSliceTypes"
import { CartStateI, CartItemI } from "./cartSliceTypes"
import { addProductToCartHelper, calcTotalPriceWithTax, getCartItemsFromLS } from './../../../utils/index';

const { items, totalPrice, totalCount } = getCartItemsFromLS()

const initialState: CartStateI = {
    items,
    totalPrice,
    totalCount
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartItemI>) => {
            if (state.items.length === 0) {
                state.items.push(action.payload)
                state.totalCount++;
                const json = JSON.stringify(state);
                localStorage.setItem('cart', json);
            } else {
                const [isSimilar, idx] = addProductToCartHelper(state.items, action.payload)
                if (isSimilar) {
                    state.items[idx].count++
                    state.totalCount++;

                } else {
                    state.items.push(action.payload)
                    state.totalCount++;
                }
                const json = JSON.stringify(state);
                localStorage.setItem('cart', json);
            }
        },
        addTotalCount: (state, action: PayloadAction<number>) => {
            if (action.payload) {
                state.totalCount++;
                const json = JSON.stringify(state);
                localStorage.setItem('cart', json);

            } else {
                state.totalCount--;
                const json = JSON.stringify(state);
                localStorage.setItem('cart', json);

            }
        },
        setTotalPrice: (state, action: PayloadAction<CurrencyItemT>) => {
            const price = state.items.reduce((sum, item: CartItemI) => {
                const obj = item.product.prices.find(price => price.currency.symbol === action.payload.symbol) || { amount: 0 }
                return sum + obj.amount * item.count
            }, 0)

            state.totalPrice = +(+calcTotalPriceWithTax(price).toFixed(2) + +price.toFixed(2)).toFixed(2)
            const json = JSON.stringify(state);
            localStorage.setItem('cart', json);
        },

        setItemCount: (state, action: PayloadAction<{ id: number, val: number }>) => {
            const id = action.payload.id
            if (action.payload.val) {
                state.items[id].count++
                const json = JSON.stringify(state);
                localStorage.setItem('cart', json);

            } else {
                state.items[id].count--
                const json = JSON.stringify(state);
                localStorage.setItem('cart', json);

            }
        }
    }
})

export const {
    addProduct,
    setTotalPrice,
    addTotalCount, setItemCount,
} = cartSlice.actions
export default cartSlice.reducer