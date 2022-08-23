import { configureStore } from '@reduxjs/toolkit'
import header from './slices/headerSlice'
export const store = configureStore({
    reducer: {
        header
    },
})