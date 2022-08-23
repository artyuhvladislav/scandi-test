import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type CurrencyItemT = {
    __typename?: string,
    symbol: string,
    label: string
}

export type CategoryItemT = {
    name: string
}

export interface HeaderStateI {
    currencies: CurrencyItemT[],
    currentCurrency: CurrencyItemT,
    status: Status,
    categories: CategoryItemT[],
    currentCategory: CategoryItemT
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

const initialState: HeaderStateI = {
    currencies: [],
    currentCurrency: {
        symbol: '$',
        label: 'USD'
    },
    status: Status.LOADING,
    categories: [],
    currentCategory: {
        name: 'all'
    }
}


export const getCurrency = createAsyncThunk(
    "post/getCurrency",
    async () => {
        const { data } = await axios.post<CurrencyItemT[]>("http://localhost:4000/", {
            query: `
            query {
              currencies {
                symbol
                label
              }
            }
          `,
        });
        return data as CurrencyItemT[];
    }
);

export const getCategory = createAsyncThunk(
    "post/getCategory",
    async () => {
        const { data } = await axios.post<CategoryItemT[]>("http://localhost:4000/", {
            query: `
            query {
                categories {
                  name
                }
              }
          `,
        });
        // @ts-ignore
        const result = data.data.categories
        return result as CategoryItemT[]
    }
);

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setCurrencies: (state, action: PayloadAction<CurrencyItemT[]>) => {
            state.currencies = action.payload
        },
        setCurrentCurrency: (state, action: PayloadAction<CurrencyItemT>) => {
            state.currentCurrency = action.payload
        },
        setCategories: (state, action: PayloadAction<CategoryItemT[]>) => {
            state.categories = action.payload
        },
        setCurrentCategory: (state, action: PayloadAction<CategoryItemT>) => {
            state.currentCategory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrency.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.currencies = action.payload;
        });

        builder.addCase(getCurrency.pending, (state) => {
            state.status = Status.LOADING;
            state.currencies = [];
        });

        builder.addCase(getCurrency.rejected, (state) => {
            state.status = Status.ERROR;
            state.currencies = [];
        })

        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.categories = action.payload;
        });

        builder.addCase(getCategory.pending, (state) => {
            state.status = Status.LOADING;
            state.categories = [];
        });

        builder.addCase(getCategory.rejected, (state) => {
            state.status = Status.ERROR;
            state.categories = [];
        })
    },
})

export const { setCurrencies, setCurrentCurrency, setCategories, setCurrentCategory } = headerSlice.actions

export default headerSlice.reducer