import { configureStore } from '@reduxjs/toolkit'
import header from './slices/headerSlice/headerSlice'
import home from './slices/homePageSlice/homePageSlice'

export const store = configureStore({
    reducer: {
        header,
        home
    }
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(setCurrentCategoryMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch