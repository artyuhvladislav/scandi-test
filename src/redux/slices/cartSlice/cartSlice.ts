import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CurrencyItemT } from "../headerSlice/headerSliceTypes"
import { CartStateI, CartItemI } from "./cartSliceTypes"
import { calcTotalPriceWithTax, getCartStateFromLS, setCartStateFromLS } from './../../../utils/index';

const defaultState: CartStateI = getCartStateFromLS()
const initialState: CartStateI = setCartStateFromLS(defaultState)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartItemI>) => {
            state.items.push(action.payload)
            state.totalCount++;
            setCartStateFromLS({ ...state, items: [...state.items, action.payload] })

        },
        addTotalCount: (state, action: PayloadAction<number>) => {
            if (action.payload) {
                state.totalCount++;

            } else {
                state.totalCount--;

            }
            setCartStateFromLS({ ...state, totalCount: state.totalCount })
        },
        setTotalPrice: (state, action: PayloadAction<CurrencyItemT>) => {
            const price = state.items.reduce((sum, item: CartItemI) => {
                const obj = item.product.prices.find(price => price.currency.symbol === action.payload.symbol) || { amount: 0 }
                return sum + obj.amount * item.count
            }, 0)
            state.totalPrice = +calcTotalPriceWithTax(price).toFixed(2) + +price.toFixed(2)
            setCartStateFromLS({ ...state, totalPrice: state.totalPrice })
        },
        setSelectedCartAttribute: (state, action: PayloadAction<any>) => {
            const id = action.payload.id
            state.items[id].product.attributes = state.items[id].product.attributes.map(atr => {
                if (atr.name === action.payload.name) {
                    return { ...atr, selectedItem: action.payload.selectedItem }
                }
                return atr
            })
            setCartStateFromLS({ ...state })
        },
        setItemCount: (state, action: PayloadAction<{ id: number, val: number }>) => {
            const id = action.payload.id
            if (action.payload.val) {
                state.items[id].count++

            } else {
                state.items[id].count--

            }
            setCartStateFromLS({ ...state, totalCount: state.totalCount })
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
            setCartStateFromLS({ ...state, totalCount: state.totalCount })
        },
    }
})

export const {
    addProduct,
    setTotalPrice,
    setSelectedCartAttribute,
    addTotalCount, setItemCount,
    removeItem } = cartSlice.actions
export default cartSlice.reducer