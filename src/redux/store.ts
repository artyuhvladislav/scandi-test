import { configureStore } from '@reduxjs/toolkit'
import header from './slices/headerSlice/headerSlice'
import home from './slices/homePageSlice/homePageSlice'

export const store = configureStore({
    reducer: {
        header,
        home
    },
})