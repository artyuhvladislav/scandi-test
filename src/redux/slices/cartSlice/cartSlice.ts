import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CurrencyItemT } from "../headerSlice/headerSliceTypes"
import { CartStateI, CartItemI } from "./cartSliceTypes"
import { addProductToCartHelper, calcTotalPriceWithTax } from './../../../utils/index';

const initialState: CartStateI = {
    items: [],
    totalPrice: 0,
    totalCount: 0
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartItemI>) => {
            if (state.items.length === 0) {
                state.items.push(action.payload)
                state.totalCount++;
            } else {
                const [isSimilar, idx] = addProductToCartHelper(state.items, action.payload)
                if (isSimilar) {
                    state.items[idx].count++
                    state.totalCount++;

                } else {
                    state.items.push(action.payload)
                    state.totalCount++;
                }


            }
        },
        addTotalCount: (state, action: PayloadAction<number>) => {
            if (action.payload) {
                state.totalCount++;

            } else {
                state.totalCount--;

            }
        },
        setTotalPrice: (state, action: PayloadAction<CurrencyItemT>) => {
            const price = state.items.reduce((sum, item: CartItemI) => {
                const obj = item.product.prices.find(price => price.currency.symbol === action.payload.symbol) || { amount: 0 }
                return sum + obj.amount * item.count
            }, 0)

            state.totalPrice = +(+calcTotalPriceWithTax(price).toFixed(2) + +price.toFixed(2)).toFixed(2)
        },

        setItemCount: (state, action: PayloadAction<{ id: number, val: number }>) => {
            const id = action.payload.id
            if (action.payload.val) {
                state.items[id].count++

            } else {
                state.items[id].count--

            }
        },
        removeItem: (state, action: PayloadAction<number>) => {

            if (state.items.length === 1) {
                state.items = [];
                state.totalCount = 0;
                state.totalPrice = 0;
            }
            const id = action.payload
            state.items = state.items.filter((_, idx) => id !== idx)
            state.totalCount = state.items.reduce((sum, cur) => {
                return sum + cur.count
            }, 0)
        },
    }
})

export const {
    addProduct,
    setTotalPrice,
    addTotalCount, setItemCount,
    removeItem } = cartSlice.actions
export default cartSlice.reducer