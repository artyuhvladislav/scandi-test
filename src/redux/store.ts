import { configureStore } from '@reduxjs/toolkit'
import header from './slices/headerSlice/headerSlice'
import home from './slices/homePageSlice/homePageSlice'
import product from './slices/productSlice/productSlice'
import cart from './slices/cartSlice/cartSlice'

export const store = configureStore({
    reducer: {
        header,
        home,
        product,
        cart
    }
})
